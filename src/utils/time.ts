export const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 9) return '早上好';
    if (hour >= 9 && hour < 12) return '上午好';
    if (hour >= 12 && hour < 18) return '下午好';
    return '晚上好';
};