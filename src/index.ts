import { Probot } from 'probot'
import { extractTargetBranches, getPullRequestPatch, userHasWritePermission } from './cherry-pick'

export = (app: Probot) => {
  app.on(['issue_comment.created', 'issue_comment.edited'], async (context) => {
    const pull_number = context.pullRequest().pull_number
    if (!pull_number) {
      return
    }

    const owner = context.repo().owner
    const repo = context.repo().repo
    const username = context.payload.comment.user.login

    if (!(await userHasWritePermission(context.octokit, owner, repo, username))) {
      return
    }

    const targetBranches = extractTargetBranches(context.payload.comment.body)
    const patch = await getPullRequestPatch(context.octokit, owner, repo, pull_number)

    if (!patch) {
      return
    }

    const issueComment = context.issue({
      body: targetBranches[0],
    })
    await context.octokit.issues.createComment(issueComment)
  })
}
