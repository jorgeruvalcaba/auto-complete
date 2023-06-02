import styles from './HighlightTerm.module.css'

type HighLightTermProps = {
  text: string
  highlight: string
}

export const HighLightTerm = ({ text, highlight }: HighLightTermProps) => {
  const regex = new RegExp(`(${highlight})`, 'gi')

  return (
    <>
      {text.split(regex).map((part, index) => {
        if (part.match(regex)) {
          return (
            <span key={index} className={styles.highlight}>
              {part}
            </span>
          )
        }
        return <span key={index}>{part}</span>
      })}
    </>
  )
}
