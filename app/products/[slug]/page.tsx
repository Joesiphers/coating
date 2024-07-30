import { getProduct } from "api/gets";
import Modal from "@/components/layout/Modal";

export default function Page({ params }: { params: { slug: string } }) {
  console.log("slug prarams", params);
  const productdatails = () => {
    try {
      return getProduct(parseInt(params.slug));
    } catch (err) {
      return <Modal info={err}>test</Modal>;
    }
  };
  return (
    <div>
      My Post:{params.slug}
      <Modal info="test"> </Modal>
    </div>
  );
}
