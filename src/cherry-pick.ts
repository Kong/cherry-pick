import { ProbotOctokit } from "probot";

const getPullRequestPatch = async (octokit: InstanceType<typeof ProbotOctokit>, owner: string, repo: string, pull_number: number) => {
    const res = await octokit.rest.pulls.get({
        owner,
        repo,
        pull_number,
        mediaType: {
            format: "patch",
        },
    })
    return res.data.body
}
