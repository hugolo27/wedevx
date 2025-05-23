'use client';

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { COUNTRIES } from '@/services/constants';
import { useRouter } from 'next/navigation';

const Layout = styled.div`
  display: flex;
  min-height: 100vh;
  background: #fff;
`;

const Sidebar = styled.aside`
  width: 240px;
  background-color: #fff;
  color: #222;
  padding: 0;
  display: flex;
  flex-direction: column;
`;

const SidebarTitleWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 80px;
  margin-bottom: 8px;
  padding-left: 24px;
`;

const SidebarTitleSpray = styled.div`
  position: absolute;
  left: -10px;
  top: -10px;
  width: 300px;
  height: 150px;
  background: radial-gradient(ellipse at 30% 30%, rgba(217, 222, 165, 0.7) 10%, rgba(217, 222, 165, 0.3) 50%, rgba(217, 222, 165, 0) 70%);
  pointer-events: none;
  z-index: 0;
  overflow: visible;
`;

const SidebarTitle = styled.div`
  font-size: 2.5rem;
  font-weight: 900;
  letter-spacing: -2px;
  color: #000;
  position: relative;
  z-index: 1;
  text-align: left;
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  height: 40px;
  width: auto;
  object-fit: contain;
`;

const SidebarNav = styled.nav`
  flex: 1;
`;

const SidebarLink = styled.a.withConfig({
  shouldForwardProp: (prop) => prop !== 'active'
})<{ active?: boolean }>`
  display: flex;
  align-items: center;
  padding: 12px 24px;
  color: #000;
  text-decoration: none;
  font-weight: ${props => props.active ? 700 : 500};
  transition: color 0.2s;

  &:hover {
    color: #222;
  }
`;

const SidebarFooter = styled.div`
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 12px;
  color: #000;
  position: relative;
  margin-top: auto;
  padding-bottom: 32px;
`;

const AdminInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  position: relative;
  padding-top: 8px;
`;

const DropdownMenu = styled.div<{ isOpen: boolean }>`
  position: absolute;
  bottom: 100%;
  left: 0;
  background: white;
  border: 1px solid #d1d1d1;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: ${props => props.isOpen ? 'block' : 'none'};
  min-width: 160px;
  margin-bottom: 8px;
`;

const DropdownItem = styled.button`
  width: 100%;
  padding: 12px 16px;
  text-align: left;
  border: none;
  background: none;
  color: #222;
  font-size: 0.875rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background-color: #f3f4f6;
  }
`;

const VerticalDivider = styled.div`
  width: 1.5px;
  background: #d1d1d1;
  height: 100vh;
`;

const AdminIcon = styled.div`
  width: 48px;
  height: 48px;
  background-color: #e5e7eb;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: #222;
  font-size: 1.25rem;
  margin-top: 4px;
`;

const AdminText = styled.span`
  font-size: 1rem;
  font-weight: 600;
  color: #222;
  margin-top: 4px;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 24px;
  background-color: #fff;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const Title = styled.h1`
  margin: 0;
  color: #111827;
  font-size: 24px;
  font-weight: 600;
`;

const SearchBar = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 24px;
  align-items: center;
  flex-direction: row;
  flex-wrap: nowrap;
`;

const SearchInputWrapper = styled.div`
  position: relative;
  width: 250px;
  min-width: 100px;
  z-index: 1;
`;

const SearchInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 8px 12px 8px 36px;
  border: 1px solid #d1d1d1;
  border-radius: 6px;
  font-size: 14px;
  background: #fff;
  color: #222;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.1);
  }

  &::placeholder {
    color: #d1d1d1;
  }
`;

const SearchIcon = styled.span`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 16px;
  color: #9ca3af;
  pointer-events: none;
`;

const StatusSelect = styled.select`
  padding: 8px 12px;
  border: 1px solid #d1d1d1;
  border-radius: 6px;
  font-size: 14px;
  background-color: white;
  min-width: 120px;
  z-index: 1;
  color: #d1d1d1;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23d1d1d1' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 16px;
  padding-right: 40px;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.1);
  }

  option {
    color: #222;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #d1d1d1;
`;

const TableHeader = styled.thead`
  background-color: #fff;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9fafb;
  }

  &:hover {
    background-color: #f3f4f6;
  }
`;

const TableCell = styled.td`
  padding: 12px 16px;
  border-bottom: 1px solid #d1d1d1;
  font-size: 14px;
  color: #374151;
`;

const TableHeaderCell = styled.th`
  padding: 12px 16px;
  text-align: left;
  font-weight: 400;
  color: #6b7280;
  border-bottom: 1px solid #d1d1d1;
  font-size: 14px;
  cursor: pointer;
  user-select: none;
  background: #fff;

  &:hover {
    background-color: #f3f4f6;
  }
`;

const SortIcon = styled.span`
  margin-left: 4px;
  color: #9ca3af;
`;

const StatusBadge = styled.span<{ status: string }>`
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  background-color: ${({ status }) => {
    switch (status) {
      case 'PENDING':
        return '#fef3c7';
      case 'REACHED_OUT':
        return '#dcfce7';
      default:
        return '#f3f4f6';
    }
  }};
  color: ${({ status }) => {
    switch (status) {
      case 'PENDING':
        return '#92400e';
      case 'REACHED_OUT':
        return '#166534';
      default:
        return '#374151';
    }
  }};
`;

const Pagination = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 24px;
  gap: 8px;
`;

const PageButton = styled.button<{ active?: boolean }>`
  padding: 8px 12px;
  border: ${props => props.active ? '1.5px solid #000' : 'none'};
  border-radius: 0;
  background-color: white;
  color: #222;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  outline: none;
  box-shadow: none;
  ${props => props.active && 'font-weight: bold;'}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    background-color: #f3f4f6;
  }
`;

const LeadRow = styled.tr`
  td {
    padding: 12px 16px;
    font-size: 16px;
    color: #222;
    border: none;
    background: none;
    font-family: inherit;
    white-space: nowrap;
    border-bottom: 1px solid #d1d1d1;
    text-align: left;
  }
  &:last-child td {
    border-bottom: none;
  }
`;

interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  country: string;
  createdAt: string;
  status: 'PENDING' | 'REACHED_OUT';
}

type SortField = 'name' | 'submitted' | 'status' | 'country';
type SortDirection = 'asc' | 'desc';

export default function AdminDashboard() {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<SortField>('submitted');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const itemsPerPage = 10;

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      console.log('Admin - Fetching leads...');
      const response = await fetch('/api/leads');
      if (!response.ok) {
        throw new Error('Failed to fetch leads');
      }
      const data = await response.json();
      console.log('Admin - Fetched leads:', data);
      setLeads(data.leads || []);
    } catch (err) {
      console.error('Error fetching leads:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch leads');
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredLeads = leads
    .filter(lead => {
      const matchesSearch = `${lead.firstName} ${lead.lastName}`.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      const direction = sortDirection === 'asc' ? 1 : -1;
      switch (sortField) {
        case 'name':
          return direction * `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`);
        case 'submitted':
          return direction * (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        case 'status':
          return direction * a.status.localeCompare(b.status);
        case 'country':
          return direction * a.country.localeCompare(b.country);
        default:
          return 0;
      }
    });

  const totalPages = Math.ceil(filteredLeads.length / itemsPerPage);
  const paginatedLeads = filteredLeads.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/admin/login');
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.admin-info')) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Layout>
      <Sidebar>
        <SidebarTitleWrapper>
          <SidebarTitleSpray />
          <SidebarTitle>
            <Logo src="/alma.png" alt="Alma" />
          </SidebarTitle>
        </SidebarTitleWrapper>
        <SidebarNav>
          <SidebarLink href="/admin" active>Leads</SidebarLink>
          <SidebarLink href="/admin/settings">Settings</SidebarLink>
        </SidebarNav>
        <SidebarFooter>
          <AdminInfo className="admin-info" onClick={toggleDropdown}>
            <AdminIcon>A</AdminIcon>
            <AdminText>Admin</AdminText>
            <DropdownMenu isOpen={isDropdownOpen}>
              <DropdownItem onClick={handleLogout}>
                <span>Log out</span>
              </DropdownItem>
            </DropdownMenu>
          </AdminInfo>
        </SidebarFooter>
      </Sidebar>
      <VerticalDivider />
      <MainContent>
        <Header>
          <Title>Leads</Title>
        </Header>

        <SearchBar>
          <SearchInputWrapper>
            <SearchIcon>🔍</SearchIcon>
            <SearchInput
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search leads"
            />
          </SearchInputWrapper>
          <StatusSelect
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            aria-label="Filter by status"
          >
            <option value="all">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="REACHED_OUT">Reached Out</option>
          </StatusSelect>
        </SearchBar>

        <Table>
          <TableHeader>
            <tr>
              <TableHeaderCell onClick={() => handleSort('name')}>
                Name
                <SortIcon>
                  {sortField === 'name' ? (sortDirection === 'asc' ? '↑' : '↓') : '↓'}
                </SortIcon>
              </TableHeaderCell>
              <TableHeaderCell onClick={() => handleSort('submitted')}>
                Submitted
                <SortIcon>
                  {sortField === 'submitted' ? (sortDirection === 'asc' ? '↑' : '↓') : '↓'}
                </SortIcon>
              </TableHeaderCell>
              <TableHeaderCell onClick={() => handleSort('status')}>
                Status
                <SortIcon>
                  {sortField === 'status' ? (sortDirection === 'asc' ? '↑' : '↓') : '↓'}
                </SortIcon>
              </TableHeaderCell>
              <TableHeaderCell onClick={() => handleSort('country')}>
                Country
                <SortIcon>
                  {sortField === 'country' ? (sortDirection === 'asc' ? '↑' : '↓') : '↓'}
                </SortIcon>
              </TableHeaderCell>
            </tr>
          </TableHeader>
          <tbody>
            {paginatedLeads.map((lead) => (
              <LeadRow key={lead.id}>
                <td>{lead.firstName} {lead.lastName}</td>
                <td>{new Date(lead.createdAt).toLocaleDateString(undefined, { month: '2-digit', day: '2-digit', year: 'numeric' })}, {new Date(lead.createdAt).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', hour12: true })}</td>
                <td>{lead.status.charAt(0) + lead.status.slice(1).toLowerCase()}</td>
                <td>{COUNTRIES.find(c => c.value === lead.country)?.label || lead.country}</td>
              </LeadRow>
            ))}
          </tbody>
        </Table>

        <Pagination>
          <PageButton
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            ‹
          </PageButton>
          {[...Array(totalPages)].map((_, index) => (
            <PageButton
              key={index + 1}
              active={currentPage === index + 1}
              onClick={() => handlePageChange(index + 1)}
              aria-label={`Page ${index + 1}`}
            >
              {index + 1}
            </PageButton>
          ))}
          <PageButton
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Next page"
          >
            ›
          </PageButton>
        </Pagination>
      </MainContent>
    </Layout>
  );
}