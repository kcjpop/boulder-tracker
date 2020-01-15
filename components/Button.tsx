export default function Button({ variant = 'blue', ...props }) {
  return (
    <button
      className={`bg-${variant}-500 border-${variant}-700 text-white font-bold py-2 px-4 border-b-4  rounded`}
      {...props}
    />
  )
}
