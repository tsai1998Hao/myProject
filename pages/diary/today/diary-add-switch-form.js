import DiaryFoodForm from './diary-add-food'
import DiaryBathForm from './diary-add-bath'
import DiaryFaecesForm from './diary-add-faeces'
import DiaryMedicalForm from './diary-add-medical'
import DiaryWorkoutForm from './diary-add-workout'

export default function DiaryForm({
  action,
  cate,
  diary,
  handleSubmit,
  handleFieldChange,
  handleDelete,
}) {
  return (
    <>
      {cate == 'food' ? (
        <DiaryFoodForm
          action={action}
          diary={diary}
          handleSubmit={handleSubmit}
          handleFieldChange={handleFieldChange}
          handleDelete={handleDelete}
        />
      ) : (
        <></>
      )}
      {cate == 'faeces' ? (
        <DiaryFaecesForm
          action={action}
          diary={diary}
          handleSubmit={handleSubmit}
          handleFieldChange={handleFieldChange}
          handleDelete={handleDelete}
        />
      ) : (
        <></>
      )}
      {cate == 'workout' ? (
        <DiaryWorkoutForm
          action={action}
          diary={diary}
          handleSubmit={handleSubmit}
          handleFieldChange={handleFieldChange}
          handleDelete={handleDelete}
        />
      ) : (
        <></>
      )}
      {cate == 'bath' ? (
        <DiaryBathForm
          action={action}
          diary={diary}
          handleSubmit={handleSubmit}
          handleFieldChange={handleFieldChange}
          handleDelete={handleDelete}
        />
      ) : (
        <></>
      )}
      {cate == 'medical' ? (
        <DiaryMedicalForm
          action={action}
          diary={diary}
          handleSubmit={handleSubmit}
          handleFieldChange={handleFieldChange}
          handleDelete={handleDelete}
        />
      ) : (
        <></>
      )}
    </>
  )
}
