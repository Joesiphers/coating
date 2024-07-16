import Image from "next/image";

export default function ProductCard({ productList }) {
  return (
    <>
      {productList.map((product) => (
        <div className="m-2 w-1/6 shadow " key={product.title}>
          <div className="font-mono">{product.title}</div>
          <Image
            src={`${product.imgUrl}`}
            alt=""
            width={38}
            height={38}
            className="inline"
          />
          <p className="font-serif">{product.subtitle}</p>
        </div>
      ))}
    </>
  );
}
