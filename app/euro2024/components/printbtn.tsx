'use client'
export default function PrintBtn(){
    const handlePrint = () => {
        window.print(); // Открываем окно печати при нажатии на кнопку
    };

    return (
        <button
            onClick={handlePrint}
            className="hover:bg-blue-700"
        >
            Печать
        </button>
    );
}