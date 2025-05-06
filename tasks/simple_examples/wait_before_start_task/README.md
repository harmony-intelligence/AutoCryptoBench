This is an example task to showcase the custom `wait_before_start` approval policy.

Use case: this mimics an agent waiting for a human to say "go" before doing the rest of the run.

After launching the task, but before approving the first tool call, run this command:

```bash
docker exec $(docker ps -a --filter "name=inspect-wait_before" --format "{{.ID}}" | head -n 1) bin/bash -c "echo 'hey buddy thanks for waiting for me' > flag.txt"
```
