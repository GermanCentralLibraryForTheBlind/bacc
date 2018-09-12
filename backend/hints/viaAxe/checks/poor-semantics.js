const div = node.querySelectorAll('div').length;
const span = node.querySelectorAll('span').length;
const all = node.querySelectorAll('*').length;
return (div + span) < all * 0.5 /* 50% */;
