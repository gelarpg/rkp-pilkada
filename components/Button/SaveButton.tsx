
interface Props {
    name: string;
}
const SaveButton = (props: Props) => {
    const { name } = props;
    return (
        <button
            type="submit"
            className="py-2 px-3 w-full capitalize gap-x-2 text-sm font-semibold rounded-full border border-transparent bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 disabled:pointer-events-none"
            >
            {name}
        </button>
    );
};

export default SaveButton;
