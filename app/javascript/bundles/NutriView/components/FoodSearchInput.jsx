import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';

const displayFetchingStatus = (isFetching) => {
  if (isFetching) {
    return (
      <h4>...searching</h4>
    );
  }
};

const displayReturnedResponse = (response) => {
  const foods = response.foods; // eslint-disable-line prefer-destructuring
  if (!foods || !foods.length) {
    return (
      <div>
        <p>No food in response</p>
      </div>
    );
  }

  return (
    <div>
      <ul>
        {
          foods.map((food) => (
            <li key={food.fdcId}>
              <div>
                <p>
                  <strong>Food Description: </strong>
                  {food.description}
                </p>
                <p>
                  <strong>Made by: </strong>
                  {food.brandOwner}
                </p>
              </div>
            </li>
          ))
        }
      </ul>
    </div>
  );
};

const FoodSearchInput = ({ isFetching, response, searchFood }) => (
  <div>
    <Formik
      initialValues={{ foodSearch: '' }}
      validate={(values) => {
        const errors = {};
        if (!values.foodSearch) {
          errors.foodSearch = 'Required';
        }

        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        searchFood(values.foodSearch);

        setTimeout(() => {
          setSubmitting(false);
        }, 400);
      }}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="foodSearch">Food Search</label>
          <input
            id="foodSearch"
            name="foodSearch"
            type="text"
            placeholder="Enter food search terms or UPC..."
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.foodSearch}
          />
          {formik.touched.foodSearch && formik.errors.foodSearch ? (
            <div>{formik.errors.foodSearch}</div>
          ) : null}
          <button
            className="primary hollow button"
            type="submit"
          >
            Submit
          </button>
        </form>
      )}
    </Formik>
    <div>
      {displayFetchingStatus(isFetching)}
    </div>
    <div>
      {displayReturnedResponse(response)}
    </div>
    <p>{isFetching}</p>
  </div>
);

FoodSearchInput.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  response: PropTypes.shape({}).isRequired,
  searchFood: PropTypes.func.isRequired,
};

export default FoodSearchInput;
