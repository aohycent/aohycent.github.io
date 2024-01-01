 import { Octokit, App } from "https://esm.sh/octokit";
  
          // Create a personal access token at https://github.com/settings/tokens/new?scopes=repo
        const octokit = new Octokit({ auth: `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` });

// Compare: https://docs.github.com/en/rest/reference/users#get-the-authenticated-user
const {
  data: { login },
} = await octokit.rest.users.getAuthenticated();
window.alert("Hello, %s", login);
      
