export default function Product() {
  return (
    <section className='mx-auto grid grid-cols-2 items-center gap-14'>
      <img
        className='mx-40 w-96'
        src='img-1.jpg'
        alt='person with dog overlooking mountain with sunset'
      />
      <div>
        <h2 className='mb-12 text-2xl font-semibold leading-6'>
          About WorldWide.
        </h2>
        <p className='mb-8 text-base'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo est
          dicta illum vero culpa cum quaerat architecto sapiente eius non
          soluta, molestiae nihil laborum, placeat debitis, laboriosam at fuga
          perspiciatis?
        </p>
        <p className='text-base'>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis
          doloribus libero sunt expedita ratione iusto, magni, id sapiente sequi
          officiis et.
        </p>
      </div>
    </section>
  );
}
