import { Suggestion } from '../../constants/api'
import { HighLightTerm } from '../HighlightTerm'
import styles from './AutocompleteList.module.css'

type AutocompleteListProps = {
  onSelect: (name: string) => void
  highlightedIndex: number | null
  items?: Suggestion[] | null
  query?: string
}

export const AutocompleteList = ({
  onSelect,
  items,
  query = '',
  highlightedIndex = 0,
}: AutocompleteListProps) => (
  <div className={styles.autocompleteList}>
    {items?.length ? (
      <section>
        {items.map(({ name, id }, index) => (
          <div
            key={id}
            onClick={() => onSelect(name)}
            className={
              highlightedIndex === index
                ? styles.listItemSelected
                : styles.listItem
            }
            tabIndex={0}
            role="button"
          >
            <HighLightTerm text={name} highlight={query} />
          </div>
        ))}
      </section>
    ) : (
      <div>No character to display</div>
    )}
  </div>
)
