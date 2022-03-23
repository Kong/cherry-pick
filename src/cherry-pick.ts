import { ProbotOctokit } from 'probot'

const getPullRequestPatch = async (
  octokit: InstanceType<typeof ProbotOctokit>,
  owner: string,
  repo: string,
  pull_number: number
) => {
  const res = await octokit.rest.pulls.get({
    owner,
    repo,
    pull_number,
    mediaType: {
      format: 'patch',
    },
  })
  return res.data.body
}

const commandRegex = new RegExp('^/cherry-pick (.+)', 'gm') // m flag for multiline
const extractTargetBranches = (comment: string) => {
  return Array.from(comment.matchAll(commandRegex), (v) => v[1])
}

const userHasWritePermission = async (
  octokit: InstanceType<typeof ProbotOctokit>,
  owner: string,
  repo: string,
  username: string
) => {
  const {
    data: { permission },
  } = await octokit.rest.repos.getCollaboratorPermissionLevel({
    owner,
    repo,
    username,
  })
  return permission === 'admin' || permission === 'write'
}

export { getPullRequestPatch, extractTargetBranches, userHasWritePermission }
