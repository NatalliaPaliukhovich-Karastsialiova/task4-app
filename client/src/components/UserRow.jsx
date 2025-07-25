import { useState } from 'react';

export default function UserRow({
  user,
  selected,
  onSelect,
  isMobile,
  isTablet,
}) {
  const handleRowClick = () => {
    onSelect();
  };

  const handleCheckboxClick = e => {
    e.stopPropagation();
    onSelect();
  };

  return (
    <tr onClick={handleRowClick}>
      <td className="py-3">
        <input
          type="checkbox"
          checked={selected}
          onChange={handleCheckboxClick}
          onClick={e => e.stopPropagation()}
        />
      </td>
      {!isTablet && !isMobile && (
        <>
          <td className="py-3">
            <div
              className={
                user.status === 'blocked'
                  ? 'text-muted text-decoration-line-through fw-medium'
                  : 'fw-medium'
              }
            >
              {`${user.first_name} ${user.last_name}`}
            </div>
            <div className="text-muted fw-light">{`${user.company_name || ''} ${user.job_title || ''}`}</div>
            <div>
              <span
                className={`badge ${user.status === 'active' ? 'bg-success py-2' : 'bg-danger py-2'}`}
              >
                {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
              </span>
            </div>
            <div
              className={
                user.status === 'blocked'
                  ? 'text-muted fw-medium small'
                  : 'fw-medium'
              }
            >
              <div>
                <span className="small fw-light text-muted">Created on: </span>
                {new Date(user.created_on).toLocaleString()}
              </div>
            </div>
          </td>
          <td
            className={
              user.status === 'blocked'
                ? 'text-muted fw-medium py-3'
                : 'fw-medium py-3'
            }
          >
            {user.email}
          </td>
          <td
            className={
              user.status === 'blocked'
                ? 'text-muted fw-medium py-3'
                : 'fw-medium py-3'
            }
          >
            <div>{new Date(user.last_login).toLocaleString()}</div>
          </td>
        </>
      )}
      {isTablet && !isMobile && (
        <>
          <td className="py-3">
            <div
              className={
                user.status === 'blocked'
                  ? 'text-muted text-decoration-line-through fw-medium'
                  : 'fw-medium'
              }
            >
              {`${user.first_name} ${user.last_name}`}
            </div>
            <div className="text-muted fw-light">{`${user.company_name || ''} ${user.job_title || ''}`}</div>
            <div>
              <span
                className={`badge ${user.status === 'active' ? 'bg-success py-2' : 'bg-danger py-2'}`}
              >
                {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
              </span>
            </div>
            <div
              className={
                user.status === 'blocked'
                  ? 'text-muted fw-medium py-3'
                  : 'fw-medium py-3'
              }
            >
              <span className="small fw-light text-muted">Email: </span>
              {user.email}
            </div>
            <div
              className={
                user.status === 'blocked'
                  ? 'text-muted fw-medium small'
                  : 'fw-medium'
              }
            >
              <div>
                <span className="small fw-light text-muted">Created on: </span>
                {new Date(user.created_on).toLocaleString()}
              </div>
            </div>
          </td>
          <td
            className={
              user.status === 'blocked'
                ? 'text-muted fw-medium py-3'
                : 'fw-medium py-3'
            }
          >
            <div>{new Date(user.last_login).toLocaleString()}</div>
          </td>
        </>
      )}
      {isMobile && (
        <>
          <td className="py-3">
            <div
              className={
                user.status === 'blocked'
                  ? 'text-muted text-decoration-line-through fw-medium'
                  : 'fw-medium'
              }
            >
              {`${user.first_name} ${user.last_name}`}
            </div>
            <div className="text-muted fw-light">{`${user.company_name || ''} ${user.job_title || ''}`}</div>
            <div>
              <span
                className={`badge ${user.status === 'active' ? 'bg-success py-2' : 'bg-danger py-2'}`}
              >
                {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
              </span>
            </div>
            <div
              className={
                user.status === 'blocked'
                  ? 'text-muted fw-medium py-3'
                  : 'fw-medium py-3'
              }
            >
              <span className="small fw-light text-muted">Email: </span>
              {user.email}
            </div>
            <div
              className={
                user.status === 'blocked'
                  ? 'text-muted fw-medium small'
                  : 'fw-medium'
              }
            >
              <div>
                <span className="small fw-light text-muted">Created on: </span>
                {new Date(user.created_on).toLocaleString()}
              </div>
            </div>
            <div
              className={
                user.status === 'blocked'
                  ? 'text-muted fw-medium small'
                  : 'fw-medium'
              }
            >
              <div>
                <span className="small fw-light text-muted">Last Seen: </span>
                {new Date(user.last_login).toLocaleString()}
              </div>
            </div>
          </td>
        </>
      )}
    </tr>
  );
}
