# Spatial Atlas

The Atlas is a second door, not the house’s only door.

## V1 implementation

This branch generates a deterministic SVG constellation and a complete textual list from the same `entries.json` and `relations.json` that feed the wiki. The list is the canonical fallback. Selection is available through ordinary links and filtering; no essential information depends on hover, canvas precision or JavaScript.

The public graph contains only production entries and their approved wing relation. It has stable node IDs, explicit relation labels and no invented edges.

## Deferred 3D gate

Direct integration with the separate 3D Cluster Engine would be a cross-repository mutation. It is intentionally not performed here. A future authorized dataset may use the public graph contract without moving private Moonverse content or making 3D mandatory.

## Interaction laws retained

- data, renderer and interface remain separate;
- filters stay outside the spatial surface;
- the selected node has a textual inspector;
- unrelated nodes may dim, but never disappear from the fallback;
- reduced motion and small-screen list mode are defaults;
- every node opens its canonical article or wing route.
