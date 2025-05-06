Tasks need to be run from the root of the repo via:
```bash
inspect eval path/to/task.py <OPTIONS>
```

See `simple_examples/hello_world` for an example of how to implement a task.

### Text only tasks

Some tasks are text only compatible:
- `tasks/crypto/transactions/same_chain`
- `tasks/crypto/transactions/cross_chain`
- `tasks/crypto/transactions/complex_conversion`
- `tasks/scaling_operations/subagent_local`

You can run in text only mode by selecting an agent that is text only e.g. by adding te flag `-T agent=text_only`.
