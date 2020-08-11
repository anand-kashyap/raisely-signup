import React from 'react';
import { useFormik } from 'formik';
import AButton from './AButton';
import { Form, Col } from 'react-bootstrap';
import { IForm } from 'interfaces/Form';
import { formSubmit, initVals } from 'utils/form';
import { useState } from 'react';

const GForm = ({ fields, formClass = '', validations = {}, onFSubmit, btnLabel }: IForm) => {
  const { schema, json, reqFields } = initVals({ fields, validations });
  const [err, setErr] = useState(false);
  const [suc, setSuc] = useState('');

  const formik = useFormik({
    initialValues: json,
    validateOnChange: false,
    validationSchema: schema,
    onSubmit: (vals, { resetForm, setSubmitting }) => {
      if (process.env.NODE_ENV === 'development') {
        console.log('Form -> vals', vals)
      }
      setSubmitting(true);
      onFSubmit(vals).then(d => {
        resetForm();
        console.log(d);
        setErr(false);
        setSuc(d.data.message);
      }).catch(e => {
        setErr(true);
        console.error(e);
      }).finally(() => setSubmitting(false));
    },
  });

  const getComponent = ({ ftype, classes: className, label, multi, opts, name, values, touched, errors, handleBlur: onBlur, handleChange: onChange }) => {
    const props: any = {
      placeholder: reqFields[name] ? label + '*' : label,
      'aria-label': label,
      multiple: multi,
      type: ftype
    };
    const persistProps = {
      className,
      name,
      'aria-describedby': 'basic-addon2',
      value: values[name],
      onBlur,
      onChange,
      isValid: touched[name] && !errors[name],
    }
    if (['text', 'email', 'password'].includes(ftype)) {
      delete props.multiple;
    } else if (ftype === 'select') {
      delete props.type;
      delete props.placeholder;
      delete props['aria-label'];
      delete persistProps.isValid;
      return <Form.Control as='select' {...props}  {...persistProps}>
        <option value='' disabled>{`Select ${name}`}</option>
        {opts.map((opt, i) =>
          typeof opt === 'string' ?
            <option key={i} >{opt}</option> :
            <option key={i} value={opt.value}>{opt.label}</option>
        )}
      </Form.Control>
    } else if (ftype === 'textarea') {
      delete props.type;
      props.as = ftype;
      props.row = 3;
    }
    return <Form.Control {...props} {...persistProps} />;
  }

  const { handleSubmit, handleChange, handleBlur, isSubmitting, values, touched, errors } = formik;

  return <Form className={formClass} noValidate onSubmit={formSubmit(handleSubmit)}>
    <Form.Row>
      {fields.map(
        ({ name, label, ftype = 'text', classes = '', opts, multi = false, xs = 12, ...colpars }, i) =>
          <Col xs={xs} key={i} {...colpars}>
            {getComponent({ ftype, classes, name, label, opts, multi, values, touched, errors, handleBlur, handleChange })}
            {touched[name] && errors[name] && <Form.Control.Feedback className='d-block' type="invalid">{touched[name] && errors[name]}</Form.Control.Feedback>}
          </Col>
      )}
    </Form.Row>

    <AButton label={btnLabel} loading={isSubmitting} />
    {err && <Form.Control.Feedback className='d-block text-center' type="invalid">Server Error</Form.Control.Feedback>}
    {suc && <Form.Control.Feedback className='d-block text-center'>{suc}</Form.Control.Feedback>}
  </Form>
}

export default GForm
