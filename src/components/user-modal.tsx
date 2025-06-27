import type { User } from '../interfaces/user.interface.ts';
import type { FC } from 'react';
import Modal from './ui-components/modal/modal.tsx';

interface UserModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
}

const UserModal: FC<UserModalProps> = ({ user, isOpen, onClose }) => {
  if (!user) return null;

  const getMapUrl = (lat: string, lng: string): string => {
    return `https://maps.google.com/?q=${lat},${lng}`;
  };

  const getWebsiteUrl = (website: string): string => {
    if (website.startsWith('http://') || website.startsWith('https://')) {
      return website;
    }
    return `https://${website}`;
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      closeOnBackdropClick={true}
      closeOnEscape={true}
      showCloseButton={true}
    >
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 id="modal-title" className="text-2xl font-bold">
              {user.name}
            </h2>
            <p className="mt-1 text-blue-100">@{user.username}</p>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-6">
          <section>
            <h3 className="mb-3 flex items-center text-lg font-semibold text-gray-800">
              <svg
                className="mr-2 h-5 w-5 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Contact Information
            </h3>
            <div className="space-y-3 rounded-lg bg-gray-50 p-4">
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-600">Email:</span>
                <a
                  href={`mailto:${user.email}`}
                  className="text-blue-600 transition-colors hover:text-blue-800"
                >
                  {user.email}
                </a>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-600">Phone:</span>
                <a
                  href={`tel:${user.phone}`}
                  className="text-blue-600 transition-colors hover:text-blue-800"
                >
                  {user.phone}
                </a>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-600">Website:</span>
                <a
                  href={getWebsiteUrl(user.website)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 transition-colors hover:text-blue-800"
                >
                  {user.website}
                </a>
              </div>
            </div>
          </section>
          <section>
            <h3 className="mb-3 flex items-center text-lg font-semibold text-gray-800">
              <svg
                className="mr-2 h-5 w-5 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Address
            </h3>
            <div className="rounded-lg bg-gray-50 p-4">
              <div className="mb-3 space-y-1">
                <p className="text-gray-700">
                  {user.address.street}, {user.address.suite}
                </p>
                <p className="text-gray-700">
                  {user.address.city}, {user.address.zipcode}
                </p>
              </div>
              <a
                href={getMapUrl(user.address.geo.lat, user.address.geo.lng)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center font-medium text-blue-600 transition-colors hover:text-blue-800"
              >
                <svg
                  className="mr-1 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
                View on Map ({user.address.geo.lat}, {user.address.geo.lng})
              </a>
            </div>
          </section>
          <section>
            <h3 className="mb-3 flex items-center text-lg font-semibold text-gray-800">
              <svg
                className="mr-2 h-5 w-5 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
              Company
            </h3>
            <div className="space-y-3 rounded-lg bg-gray-50 p-4">
              <div>
                <span className="text-lg font-semibold text-gray-800">
                  {user.company.name}
                </span>
              </div>
              <div>
                <span className="text-gray-600 italic">
                  "{user.company.catchPhrase}"
                </span>
              </div>
              <div>
                <span className="text-sm text-gray-500">{user.company.bs}</span>
              </div>
            </div>
          </section>
        </div>
      </div>

      <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="rounded-lg bg-gray-200 px-4 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-300 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none"
          >
            Close
          </button>
          <button
            onClick={() => {
              // Действие для редактирования пользователя
              console.log('Edit user:', user);
            }}
            className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
          >
            Edit User
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default UserModal;
