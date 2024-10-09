import { Button, Spinner } from 'flowbite-react'

import PropTypes from 'prop-types'

function LoadingPage({ errors, onReload }) {
  return (
    <div className='w-screen h-screen flex justify-center items-center flex-col'>
      {!errors ? <Spinner /> : <>
        <h1 className='font-bold text-lg'>There are errors</h1>
        {errors.map(e => <p key={e} className='pb-2 text-sm opacity-80'>{e}</p>)}
        <Button onClick={onReload}>Reload</Button>
      </>}
    </div>
  )
}

LoadingPage.propTypes = {
  errors: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.bool]),
  onReload: PropTypes.func.isRequired
}

export default LoadingPage