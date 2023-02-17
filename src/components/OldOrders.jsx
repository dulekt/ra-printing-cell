export default function OldOrders({ oldOrders }) {
  console.log("old", oldOrders);
  return (
    <div>
      <h1>stareZamówienia</h1>
      {oldOrders.map((order) => (
        <p>{order.user}</p>
      ))}
    </div>
  );
}
