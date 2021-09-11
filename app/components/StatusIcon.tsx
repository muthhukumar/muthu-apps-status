import { FaCheck } from 'react-icons/fa'
import { MdClose } from 'react-icons/md'

function StatusIcon({ isOperational }: { isOperational: boolean }) {
  return isOperational ? (
    <FaCheck className="text-green-500" />
  ) : (
    <MdClose className="text-red-500" size="20" />
  )
}

export default StatusIcon
