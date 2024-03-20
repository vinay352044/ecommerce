import { FaShop } from "react-icons/fa6";

const SellerDetails = ({ labelClass , seller, readOnly, handleChange, inputClass , infoWrapperClass }) => {
  return (
    <>
      <div className={`${infoWrapperClass}  w-full`}>
        <label htmlFor="email" className={labelClass}>
          <FaShop /> :
        </label>
        <input
          type="text"
          name="businessName"
          value={seller?.businessName}
          readOnly={readOnly}
          onChange={handleChange}
          className={`${inputClass} font-medium text-xl border-none bg-transparent w-full`}
          required
        />
      </div>
      <div className={`${infoWrapperClass} border-none`}>
        <label htmlFor="email" className={`${labelClass}`}>
          GST :
        </label>
        <input
          type="text"
          name="gstin"
          value={seller?.gstin}
          readOnly={true}
          onChange={handleChange}
          className={`${inputClass} font-medium text-lg border-none bg-transparent w-[60%]`}
        />
      </div>
    </>
  );
};

export default SellerDetails;
