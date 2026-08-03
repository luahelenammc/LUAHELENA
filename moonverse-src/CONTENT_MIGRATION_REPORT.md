# Content Migration Report

## Baseline

- repository: `luahelenammc/LUAHELENA`
- baseline: `0b7882d05086b9c5acd464f5812bfaa99ef9a73b`
- source path: `moonverse/`
- public path preserved: `/moonverse/`

## Inventory disposition

The legacy implementation had 16 page records, six rooms, six memory seeds, a seven-theme registry, controlled taxonomy/privacy files, image registries, 24 Notion index records and two full Notion snapshots. The old runtime, styles, wrappers and data are preserved under `moonverse/legacy-v0/` on the feature branch.

One entry—`O cheiro de maresia`—was migrated into the new typed source because the legacy manifest marked it `published` and `public`. The six wings were normalized. The remaining records are explicitly deferred or marked for Moon review in `data/migration-ledger.json`.

The uploaded `welcometomycutelife BRUTO.txt` was treated as a historical source attachment. Its raw content was not copied into the public artifact and no passage was promoted without editorial selection and approval.

## Zero silent loss

Every legacy class has a ledger disposition: migrated, deferred, archived, needs Moon review or source review required. A later content pass can promote an item by changing the source record and rerunning the gate; it does not need to reverse-engineer the old card runtime.
