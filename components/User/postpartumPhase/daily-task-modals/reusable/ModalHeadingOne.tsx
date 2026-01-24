const ModalHeadingOne = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="p-3 mt-2 mb-8 rounded-xl bg-[#229ECF]/10 border border-[#229ECF]/40!">
      <h3 className="font-semibold text-[#229ECF]">{title}</h3>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );
};
export default ModalHeadingOne;
