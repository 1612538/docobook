const Title = ({ name1, name2 }) => {
  return (
    <h5 className="pb-2">
      <b className="ms-3 bg-dark text-white rounded px-3 py-2">{name1}</b>
      <div
        className="ms-1 px-3 pb-1 pt-1 border-bottom border-2 border-dark"
        style={{ display: "inline-block", textTransform: "uppercase" }}
      >
        {name2}
      </div>
    </h5>
  );
};
export default Title;
