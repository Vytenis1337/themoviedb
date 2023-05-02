import './Form.css';

export const Form = () => {
  return (
    <form
      className='contacts-form'
      action='https://formsubmit.co/vytenis.kondrackis@gmail.com'
      method='POST'
    >
      <h1>Write Me</h1>
      <div className='contacts-form-field'>
        <label className='contacts-form-label'>name</label>
        <input
          required
          type='text'
          name='name'
          className='contacts-form-input'
        />
      </div>

      <div className='contacts-form-field'>
        <label className='contacts-form-label'>email</label>
        <input
          required
          type='email'
          name='email'
          className='contacts-form-input'
        />
      </div>
      <div className='contacts-form-field'>
        <label className='contacts-form-label'>message</label>
        <textarea
          required
          name='message'
          className='contacts-form-input'
        ></textarea>
      </div>

      <div className='flex items-center justify-center'>
        <button className='contacts-form-button'>send message</button>
      </div>
    </form>
  );
};
