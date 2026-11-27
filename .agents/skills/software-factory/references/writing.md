# Engineering writing standard

## Purpose

Write concise, accurate technical English for humans and agents. Use ASD-STE100 Issue 9 as the controlled-language reference. Apply the rules to the text and use permitted technical names and verbs for the domain. Do not change exact identifiers, code, commands, literals, standard titles or quotations to make them look compliant.

Use the current authorized standard and dictionary when available. Check word meaning and part of speech, permitted technical terms, sentence construction and consistency. A spell check, readability score or model assertion is not an STE compliance check. If the standard or a suitable check is unavailable, apply the rules below, mark the writing as STE-inspired and identify the limitation. Do not claim certified or fully checked compliance. See [official ASD-STE100 downloads](https://www.asd-ste100.org/STE_downloads.html).

## Language and structure

- Use one term for one concept. Define a technical term at first use or link its canonical definition. Keep identifiers and terminology stable across artifacts.
- Prefer active voice, explicit subjects and direct verbs. Use the imperative for instructions. Use one action per step and one main claim per sentence. Use short paragraphs and avoid long noun chains. Apply the appropriate STE sentence rules to the text type. Use American English spelling for STE prose, except literal names and quotations. Put an essential condition before the action in a work step. Do not invent dictionary approvals.
- Use direct, consistent obligation language. In normative system specifications apply BCP 14 (RFC 2119 and RFC 8174) to uppercase keywords. In other project instructions, use plain `must`, `should` and `may` in their ordinary meanings. Do not silently mix NASA-style `shall` with RFC semantics. Keep identifiers and source links with consequential obligations. Make the condition, actor and observable result explicit. Avoid vague promises, figurative language, unnecessary adjectives and semicolons in ordinary prose.
- Separate facts, assumptions, hypotheses, requirements, decisions and observations. Cite external claims near the claim. Include a source version and precise locator where relevant. Cite implementation evidence by path, symbol and revision. Do not cite unread evidence as inspected.
- Start with the outcome or conclusion. Put details in descriptive sections. Use tables for comparisons, rules and verification evidence. Use simple examples with explicit inputs and expected results. Use synthetic, non-sensitive data. Run examples where possible and label untested sketches.
- Use Mermaid for structure, flow, state, sequence or dependencies when it clarifies the subject. Use C4 conventions for architecture views. Give a diagram a title, scope, labeled arrows and a legend when necessary. Use readable node labels and code fences. Keep text and diagrams consistent. Render or parse diagrams with the target tool when available. Report if not checked.

## Documentation forms

Use [Diátaxis](https://diataxis.fr/) for reader-facing guides. Choose a tutorial (learning), how-to guide (task), reference (facts), or explanation (understanding) based on reader need. Keep the purpose clear and link related pages. Do not force internal requirements, research, ADRs or tickets into those four forms. Use their specialized templates. See the [documentation formats](../../maintain-documentation/references/documentation-formats.md).

## Length and references

| Artifact | Prose target |
|---|---|
| Research report | As needed for evidence |
| Requirements document | As needed for domain and approved scope |
| System specification | As needed for approved behavior and conformance, not speculative future features |
| ADR | 300–600 words |
| Epic | 400–800 words |
| Issue | 250–500 words |
| PR description | 100–300 words |
| Chat review | 150–300 words plus requested artifact |

Targets guide editing, not acceptance. Exclude necessary code shapes, diagrams, tables of evidence and identifiers from the prose budget. Keep required criteria, assumptions and constraints even if longer. Shorten by removing duplication, using precise references to approved immutable revisions and separating reader-facing detail. Do not split a ticket merely to meet a word count. Explain material exceptions briefly. An issue is complete with its accessible, approved references, not necessarily a self-contained document.

For experience and visual design records use their dedicated templates. EXPERIENCE.md describes approved task flows and interaction decisions with evidence and references. DESIGN.md is a concise rulebook: target 400–800 words of prose for an initial focused design direction, expanding only for meaningful rules. Store exact token values and component APIs in code. Keep visual comparisons and examples in real prototypes/stories, not repeated prose. Use plain-language questions and show visible alternatives. Do not describe aesthetic impressions as measured facts.
