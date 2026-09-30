import React from 'react';
import {useState} from 'react';

export function TreeNode({label, children}) {
  const [expended, setExpended] = useState(false);
  const hasChildren = children && children.length > 0;

  return (
    <li
      className="tree-node"
      data-testid={hasChildren ? 'tree-branch' : undefined}
    >
      <div className="tree-node-row" data-testid="tree-level">
        {hasChildren ? (
          <button
            type="button"
            className="tree-toggle"
            data-testid="tree-toggle"
            aria-expanded={expended}
            onClick={() => setExpended((prev) => !prev)}
          >
            {expended ? '▾' : '▸'}
          </button>
        ) : (
          <span className="tree-toggle-placeholder"></span>
        )}
        <span className="tree-label">{label}</span>
      </div>

      {hasChildren && expended && <ul className="tree-children">{children}</ul>}
    </li>
  );
}
