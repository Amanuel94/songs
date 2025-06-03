/** @jsxImportSource @emotion/react */
const Loading = () => {
  return (
    <div
      css={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 1000,
        opacity: 0.8,
        backgroundColor: "white",
        height: "100%",
        width: "100%",
        textAlign: "center",
        paddingTop: "50vh",
      }}
    >
      <h2>Wait a second...</h2>
    </div>
  );
};

export default Loading;
