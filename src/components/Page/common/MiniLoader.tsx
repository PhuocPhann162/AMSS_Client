function MiniLoader({ type = 'warning', size = 'xs' }) {
  return (
    <div>
      <span
        className={`loading loading-spinner loading-${size} text-${type}`}
      ></span>
    </div>
  );
}

export default MiniLoader;
