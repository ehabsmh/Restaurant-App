function ItemSize({ size }) {
  return (
    <>
      <th className="border-gradient-1 text-main-inactive cursor-pointer border p-2 text-sm">
        {size.size}
      </th>
      {/* <td className="border-gradient-1 text-main-inactive cursor-pointer border p-2 text-sm">
        Large
      </td>
      <td className="border-gradient-1 text-secondary bg-main-active cursor-pointer border p-2 text-sm">
        Family
      </td> */}
    </>
  );
}

export default ItemSize;
