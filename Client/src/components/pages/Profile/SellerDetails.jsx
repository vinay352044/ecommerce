import { FaShop } from "react-icons/fa6";

const SellerDetails = ({
  seller,
  readOnly,
  handleChange,
  infoWrapperClass,
}) => {
  const labelClass =
    "mr-2 font-bold md:text-2xl text-[#2590db] flex items-center gap-2";
  const inputClass = `px-3 py-1 w-full md:w-[85%] text-lg md:text-xl font-medium border-none bg-transparent focus:outline-none`;
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
          className={`${inputClass}`}
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
          className={`${inputClass} w-[65%!important]`}
        />
      </div>
    </>
  );
};

export default SellerDetails;
