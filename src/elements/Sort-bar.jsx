function SortBar({ sort, setSort, asc, setAsc }) {
  return (
    <section className="sortBar">
      <label htmlFor="sort">Sort by</label>
      <select
        defaultValue={`${sort}`}
        onChange={(event) => {
          event.target.value !== "latest"
            ? setSort(event.target.value)
            : setSort(undefined);
        }}
        id="sort"
      >
        <option>latest</option>
        <option>title</option>
        <option>owner</option>
        <option>votes</option>
      </select>
      <label htmlFor="ascending">Sort by</label>
      <select
        defaultValue={asc === "asc" ? `ascending` : `descending`}
        onChange={(event) => {
          event.target.value === "ascending" ? setAsc("asc") : setAsc("desc");
        }}
        className=""
        id="ascending"
      >
        <option>descending</option>
        <option>ascending</option>
      </select>
    </section>
  );
}

export default SortBar;
