const GITHUB_API_BASE = 'https://api.github.com';

const getEnv = (name) => process.env[name] || '';

const getFileInfo = async (ownerRepo, branch, path, token) => {
  const url = `${GITHUB_API_BASE}/repos/${ownerRepo}/contents/${encodeURIComponent(path)}?ref=${encodeURIComponent(branch)}`;
  const res = await fetch(url, {
    headers: {
      Accept: 'application/vnd.github.v3+json',
      Authorization: token ? `token ${token}` : undefined
    }
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub read failed: ${res.status} ${text}`);
  }
  return res.json();
};

const updateFile = async (ownerRepo, branch, path, contentStr, sha, token) => {
  const url = `${GITHUB_API_BASE}/repos/${ownerRepo}/contents/${encodeURIComponent(path)}`;
  const body = {
    message: 'Update content via Netlify Function',
    content: Buffer.from(contentStr, 'utf8').toString('base64'),
    branch
  };
  if (sha) body.sha = sha;

  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      Accept: 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
      Authorization: token ? `token ${token}` : undefined
    },
    body: JSON.stringify(body)
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub update failed: ${res.status} ${text}`);
  }
  return res.json();
};

const triggerNetlifyBuild = async (hookUrl) => {
  if (!hookUrl) return null;
  const res = await fetch(hookUrl, { method: 'POST' });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Netlify build hook failed: ${res.status} ${text}`);
  }
  return res.text();
};

exports.handler = async function (event, context) {
  const GITHUB_TOKEN = getEnv('GITHUB_TOKEN');
  const GITHUB_REPO = getEnv('GITHUB_REPO'); // owner/repo
  const GITHUB_BRANCH = getEnv('GITHUB_BRANCH') || 'main';
  const CONTENT_PATH = getEnv('CONTENT_PATH') || 'server/content.json';
  const NETLIFY_BUILD_HOOK = getEnv('NETLIFY_BUILD_HOOK');

  if (!GITHUB_REPO || !GITHUB_TOKEN) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'GITHUB_REPO and GITHUB_TOKEN must be set in Netlify environment variables' })
    };
  }

  try {
    if (event.httpMethod === 'GET') {
      const info = await getFileInfo(GITHUB_REPO, GITHUB_BRANCH, CONTENT_PATH, GITHUB_TOKEN);
      const content = Buffer.from(info.content, 'base64').toString('utf8');
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: content
      };
    }

    if (event.httpMethod === 'POST') {
      const nextContent = event.body;
      if (!nextContent) {
        return { statusCode: 400, body: JSON.stringify({ error: 'Missing body' }) };
      }

      // Get current file to obtain sha
      let sha = null;
      try {
        const info = await getFileInfo(GITHUB_REPO, GITHUB_BRANCH, CONTENT_PATH, GITHUB_TOKEN);
        sha = info.sha;
      } catch (e) {
        // file may not exist yet; continue with null sha
      }

      // Ensure body is JSON string
      const contentStr = typeof nextContent === 'string' ? nextContent : JSON.stringify(JSON.parse(nextContent), null, 2);

      await updateFile(GITHUB_REPO, GITHUB_BRANCH, CONTENT_PATH, contentStr, sha, GITHUB_TOKEN);

      let buildHookResult = null;
      if (NETLIFY_BUILD_HOOK) {
        try {
          await triggerNetlifyBuild(NETLIFY_BUILD_HOOK);
          buildHookResult = 'triggered';
        } catch (hookError) {
          console.warn('Netlify build hook failed:', hookError);
          buildHookResult = `failed: ${hookError.message}`;
        }
      }

      const responseBody = { status: 'ok' };
      if (buildHookResult) {
        responseBody.buildHook = buildHookResult;
      }

      return { statusCode: 200, body: JSON.stringify(responseBody) };
    }

    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  } catch (error) {
    console.error('Function error', error);
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};
