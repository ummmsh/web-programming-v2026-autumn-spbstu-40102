import React from 'react';
import {TreeNode} from './TreeNode';

export function BookTree({data}) {
  return (
    <>
      <h1>Книжный магазин</h1>
      <ul className="tree-root" data-testid="tree">
        {data.map((authorEntry) => (
          <TreeNode key={authorEntry.author} label={authorEntry.author}>
            {authorEntry.publishers.map((publisher) => (
              <TreeNode key={publisher.name} label={publisher.name}>
                {publisher.genres.map((genre) => (
                  <TreeNode key={genre.name} label={genre.name}>
                    {genre.books.map((book) => (
                      <TreeNode key={book} label={book}></TreeNode>
                    ))}
                  </TreeNode>
                ))}
              </TreeNode>
            ))}
          </TreeNode>
        ))}
      </ul>
    </>
  );
}
