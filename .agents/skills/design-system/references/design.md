# Visual design contract template

Default location: root `DESIGN.md`. This is a compact rulebook for an approved visual system, not a second UX specification or a list of every component. Record only consequential decisions and link the actual semantic token file, component source and Storybook stories. Use stable DS IDs for rules that need traceability. Keep actual styling values in code. All examples below are placeholders, not approved defaults.

# <Product> — Design system

Status: <draft | approved | superseded>
Scope: <affected product or journey>
Experience: <approved UX references and revision>
Foundation: <approved React stack, component foundation and ADR>
Tokens: <canonical file/paths>
Storybook: <canonical local command, configured story roots and approved preview/evidence refs>
Approval: <trusted exact revision reference or pending>

## 1. Visual intent and references

| Reference | Observed trait | Adopt / reject / investigate | Reason |
|---|---|---|---|
| <URL or approved reference> | <visible trait> | <decision> | <task-related reason> |

<Briefly state how the experience should feel and how visual priorities serve intended tasks. Do not copy reference branding.>

## 2. Design principles and visual rules

| ID | Approved rule | Rationale | Evidence / implementation |
|---|---|---|---|
| DS-001 | <e.g., separate work areas with borders rather than decorative shadows> | <why> | <token or composition/story ref> |

## 3. Foundations

| Concern | Approved convention | Canonical token or configuration |
|---|---|---|
| Color and semantic status | <roles, contrast, theme scope> | <path/symbol> |
| Typography | <hierarchy, reading, numeric alignment> | <path/symbol> |
| Spacing and density | <rhythm, hierarchy, permitted density> | <path/symbol> |
| Surfaces, borders and elevation | <rules> | <path/symbol> |
| Icons and motion | <meaning, transitions, reduced motion> | <path/symbol> |

## 4. Component and pattern conventions

<Describe component usage, composition, state ownership, permitted variants and accessibility conventions. Refer to actual component stories for contracts; do not copy props or exhaustive variant tables here.>

## 5. Interaction feedback, responsive layout and copy

<Describe visual feedback, status semantics, keyboard focus treatment, breakpoints/overflow policy and interface language. Reference EXPERIENCE and SPEC for behavior. Record WCAG target and approved constraints without claiming unverified compliance.>

## 6. Representative compositions and reuse

| Composition / story ID | Journey / design rules | Approved revision / status |
|---|---|---|
| <story> | <UX and DS refs> | <pending or exact approval ref> |

<How to find components, use approved tokens, add a new story and run checks. Link commands and verification requirements instead of copying them.>

## 7. Known limitations and extension decisions

<Pending visual decisions, unsupported themes/devices or verification gaps. State scope and owner. No unapproved guarantee.>
