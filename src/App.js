import "./App.css";
import { useSelector, useDispatch, connect } from "react-redux";
import {
  resetData,
  fetchData,
  incrementId,
  decrementId,
  enterCustomId,
} from "./features/dataSlice";
import { useEffect } from "react";

function App(props) {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data);

  const renderImg = () => {
    if (data.apiData?.primaryImage) {
      return (
        <img
          style={{ width: "100vw" }}
          src={data.apiData.primaryImage}
          alt={data.apiData.title}
        />
      );
    } else {
      return <h3>No Image Present</h3>;
    }
  };

  useEffect(() => {
    dispatch(fetchData());
  }, [props.objectId, dispatch]);

  return (
    <div className="App">
      <div>
        <button onClick={() => dispatch(fetchData())}>Thunk!</button>
        <button onClick={() => dispatch(resetData())}>Clear</button>
        <button onClick={() => dispatch(incrementId())}>Next</button>
        <button onClick={() => dispatch(decrementId())}>Back</button>
      </div>
      <input
        value={data.objectId}
        onChange={(e) => {
          dispatch(enterCustomId(Number(e.target.value)));
        }}
      />
      <div>
        Art Id:{data.objectId}
        {renderImg()}
      </div>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => ({
  objectId: state.data.objectId,
});

export default connect(mapStateToProps)(App);
