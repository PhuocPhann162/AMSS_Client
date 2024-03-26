export default function Pricing() {
  return (
    <section className='mx-auto grid grid-cols-2 gap-14 items-center'>
      <div className='ms-40'>
        <h2 className='text-2xl font-semibold leading-6 mb-12'>
          Simple pricing.
          <br />
          Just $9/month.
        </h2>
        <p className='text-base mb-8'>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae vel labore mollitia iusto. Recusandae quos
          provident, laboriosam fugit voluptatem iste.
        </p>
      </div>
      <img className='w-96' src='img-2.jpg' alt='overview of a large city with skyscrapers' />
    </section>
  );
}
