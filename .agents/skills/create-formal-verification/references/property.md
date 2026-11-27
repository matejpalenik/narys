# PROP-<number>: <property name>

Manifest: <link to the matching YAML file>

## Property and harm

<Plain-language guarantee and consequence of a violation. Link canonical SPEC guarantee, source REQ IDs, applicable CONF case, and critical property approval. Do not redefine the normative guarantee.>

## Verification method

<Why the tool is appropriate. Describe whether the guarantee is checked on actual code or a model, bounded or unbounded, and safety or liveness. Link the manifest for exact tool, command, bounds and assumptions.>

## Correspondence

| Model action or property element | Code or design element | Evidence and atomicity |
|---|---|---|
| <element> | <path and symbol> | <mapping, constraints and limits> |

## Results

| Check | Expected | Observed | Evidence |
|---|---|---|---|
| Broken variant | <violation detected> | <actual result> | <artifact and revision> |
| Actual target | <property holds within scope> | <actual result> | <artifact and revision> |

## Limitations and maintenance

<Unverified behaviour, remaining risks, evidence limitations and maintenance trigger. Identify defects separately from model drift. Operational coverage, sync revision and command are canonical in the manifest.>
