import { FaShop } from "react-icons/fa6";

const SellerDetails = ({ labelClass , seller, readOnly, handleChange, inputClass }) => {
  return (
    <>
      <div className="flex items-center">
        <label htmlFor="email" className={labelClass}>
          <FaShop /> :
        </label>
        <input
          type="text"
          name="businessName"
          value={seller?.businessName}
          readOnly={readOnly}
          onChange={handleChange}
          className={`${inputClass} font-medium text-xl border-none bg-transparent`}
          required
        />
      </div>
      <div className="flex items-center">
        <label htmlFor="email" className={`${labelClass} text-xl`}>
          GST No. :
        </label>
        <input
          type="text"
          name="gstin"
          value={seller?.gstin}
          readOnly={true}
          onChange={handleChange}
          className={`${inputClass} font-medium text-lg border-none bg-transparent`}
        />
      </div>
    </>
  );
};

export default SellerDetails;
