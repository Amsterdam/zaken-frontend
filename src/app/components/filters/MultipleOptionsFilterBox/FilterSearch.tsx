import styles from "./FilterSearch.module.css";

type Props = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: () => void;
};

const FilterSearch: React.FC<Props> = ({ onChange, onFocus }) => (
  <input
    className={ styles.input }
    type="search"
    placeholder="Type om te zoeken..."
    onChange={onChange}
    onFocus={onFocus}
  />
);

export default FilterSearch;
