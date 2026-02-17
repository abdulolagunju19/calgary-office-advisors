
import React, { useEffect, useState } from 'react';
import {
  Box, Heading, Button, Table, Thead, Tbody, Tr, Th, Td, Image, Tag, Input, Select, HStack, Text, VStack, Tabs, TabList, TabPanels, Tab, TabPanel, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure
} from '@chakra-ui/react';
import NextLink from 'next/link';
import Layout from '../../components/Layout';

const fetchJson = async (url) => fetch(url).then(res => res.json());
const fetchMdList = async () => [
  { slug: 'office-costs-calgary', title: 'How much does office space cost in Calgary?' },
  { slug: 'plan-office-move', title: 'How to plan an office move in Calgary' },
  { slug: 'sublease-vs-headlease', title: 'Sublease vs headlease: what business owners should know' }
];

export default function Dashboard() {
  const [buildings, setBuildings] = useState([]);
  const [buildingForm, setBuildingForm] = useState({ name: '', address: '', submarket: '', description: '' });
  const [editBuildingId, setEditBuildingId] = useState(null);
  const [coworking, setCoworking] = useState([]);
  const [coworkingForm, setCoworkingForm] = useState({ name: '', location: '', submarket: '', description: '' });
  const [editCoworkingId, setEditCoworkingId] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [companyForm, setCompanyForm] = useState({ name: '', address: '', website: '', category: '', description: '' });
  const [editCompanyId, setEditCompanyId] = useState(null);
  const [references, setReferences] = useState({ designers: [], lawFirms: [] });
  const [insights, setInsights] = useState([]);
  const [insightForm, setInsightForm] = useState({ slug: '', title: '', date: '', excerpt: '', content: '' });
  const [editInsightSlug, setEditInsightSlug] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalType, setModalType] = useState('');

  useEffect(() => {
    fetchJson('/api/buildings').then(setBuildings);
    fetchJson('/api/coworking').then(setCoworking);
    fetchJson('/api/companies').then(data => setCompanies(Array.isArray(data) ? data : []));
    fetchJson('/api/references').then(setReferences);
    fetchMdList().then(setInsights);
  }, []);

  const openAddModal = (type) => {
    setModalType(type);
    if (type === 'insights') {
      setEditInsightSlug(null);
      setInsightForm({ slug: '', title: '', date: '', excerpt: '', content: '' });
    } else if (type === 'companies') {
      setEditCompanyId(null);
      setCompanyForm({ name: '', address: '', website: '', category: '', description: '' });
    } else if (type === 'buildings') {
      setEditBuildingId(null);
      setBuildingForm({ name: '', address: '', submarket: '', description: '' });
    } else if (type === 'coworking') {
      setEditCoworkingId(null);
      setCoworkingForm({ name: '', location: '', submarket: '', description: '' });
    }
    onOpen();
  };

  const openEditInsight = (insight) => {
    setModalType('insights');
    setEditInsightSlug(insight.slug);
    setInsightForm({
      slug: insight.slug,
      title: insight.title || '',
      date: insight.date || '',
      excerpt: insight.excerpt || '',
      content: insight.content || '',
    });
    onOpen();
  };

  const handleInsightFormChange = (e) => {
    const { name, value } = e.target;
    setInsightForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleInsightContentChange = (e) => {
    setInsightForm((prev) => ({ ...prev, content: e.target.value }));
  };

  const handleInsightSubmit = async () => {
    // POST or PUT to /api/insights (to be implemented)
    // For now, just close modal and refresh list
    onClose();
    fetchMdList().then(setInsights);
  };

  const openEditBuilding = (building) => {
    setModalType('buildings');
    setEditBuildingId(building.id);
    setBuildingForm({
      name: building.name || '',
      address: building.address || '',
      submarket: building.submarket || '',
      description: building.description || '',
    });
    onOpen();
  };

  const openEditCoworking = (cw) => {
    setModalType('coworking');
    setEditCoworkingId(cw.id);
    setCoworkingForm({
      name: cw.name || '',
      location: cw.location || '',
      submarket: cw.submarket || '',
      description: cw.description || '',
    });
    onOpen();
  };

  const handleBuildingFormChange = (e) => {
    const { name, value } = e.target;
    setBuildingForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCoworkingFormChange = (e) => {
    const { name, value } = e.target;
    setCoworkingForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBuildingSubmit = async () => {
    const method = editBuildingId ? 'PUT' : 'POST';
    const url = '/api/buildings';
    const body = { ...buildingForm, id: editBuildingId };
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      fetchJson('/api/buildings').then(setBuildings);
      onClose();
    }
  };

  const handleCoworkingSubmit = async () => {
    const method = editCoworkingId ? 'PUT' : 'POST';
    const url = '/api/coworking';
    const body = { ...coworkingForm, id: editCoworkingId };
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      fetchJson('/api/coworking').then(setCoworking);
      onClose();
    }
  };

  const openEditCompany = (company) => {
    setModalType('companies');
    setEditCompanyId(company.id);
    setCompanyForm({
      name: company.name || '',
      address: company.address || '',
      website: company.website || '',
      category: company.category || '',
      description: company.description || '',
    });
    onOpen();
  };

  const handleCompanyFormChange = (e) => {
    const { name, value } = e.target;
    setCompanyForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCompanySubmit = async () => {
    const method = editCompanyId ? 'PUT' : 'POST';
    const url = '/api/companies';
    const body = { ...companyForm, id: editCompanyId };
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      fetchJson('/api/companies').then(data => setCompanies(Array.isArray(data) ? data : []));
      onClose();
    }
  };

  return (
    <Layout>
      <Box maxW="1100px" mx="auto" mt={16} px={{ base: 4, md: 8 }} py={8}>
        <Heading size="lg" mb={6}>Content Dashboard</Heading>
        <Tabs variant="enclosed" colorScheme="blue">
          <TabList>
            <Tab>Insights</Tab>
            <Tab>Buildings</Tab>
            <Tab>Coworking</Tab>
            <Tab>Companies</Tab>
            <Tab>References</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <HStack justify="space-between" mb={4}>
                <Heading size="md">Insights</Heading>
                <Button colorScheme="blue" onClick={() => openAddModal('insights')}>Add New Insight</Button>
              </HStack>
              <VStack align="stretch" spacing={4}>
                {insights.map(i => (
                  <Box key={i.slug} p={4} borderWidth="1px" borderRadius="md">
                    <Text fontWeight="bold">{i.title}</Text>
                    <NextLink href={`/insights/${i.slug}`} passHref legacyBehavior>
                      <Button size="sm" mt={2}>View</Button>
                    </NextLink>
                    <Button size="sm" mt={2} ml={2} onClick={() => openEditInsight(i)}>Edit</Button>
                  </Box>
                ))}
              </VStack>
            </TabPanel>
            <TabPanel>
              <HStack justify="space-between" mb={4}>
                <Heading size="md">Buildings</Heading>
                <Button colorScheme="blue" onClick={() => openAddModal('buildings')}>Add New Building</Button>
              </HStack>
              <Table variant="simple" size="md">
                <Thead>
                  <Tr>
                    <Th>Name</Th><Th>Address</Th><Th>Submarket</Th><Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {buildings.map(b => (
                    <Tr key={b.id}>
                      <Td>{b.name}</Td>
                      <Td>{b.address}</Td>
                      <Td>{b.submarket}</Td>
                      <Td>
                        <Button size="sm" onClick={() => openEditBuilding(b)}>Edit</Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TabPanel>
            <TabPanel>
              <HStack justify="space-between" mb={4}>
                <Heading size="md">Coworking</Heading>
                <Button colorScheme="blue" onClick={() => openAddModal('coworking')}>Add New Coworking</Button>
              </HStack>
              <Table variant="simple" size="md">
                <Thead>
                  <Tr>
                    <Th>Name</Th><Th>Location</Th><Th>Submarket</Th><Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {coworking.map(c => (
                    <Tr key={c.id}>
                      <Td>{c.name}</Td>
                      <Td>{c.location}</Td>
                      <Td>{c.submarket}</Td>
                      <Td>
                        <Button size="sm" onClick={() => openEditCoworking(c)}>Edit</Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TabPanel>
            <TabPanel>
              <HStack justify="space-between" mb={4}>
                <Heading size="md">Companies</Heading>
                <Button colorScheme="blue" onClick={() => openAddModal('companies')}>Add New Company</Button>
              </HStack>
              <Table variant="simple" size="md">
                <Thead>
                  <Tr>
                    <Th>Name</Th><Th>Address</Th><Th>Category</Th><Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {Array.isArray(companies) && companies.map(c => (
                    <Tr key={c.id}>
                      <Td>{c.name}</Td>
                      <Td>{c.address}</Td>
                      <Td>{c.category}</Td>
                      <Td>
                        <Button size="sm" onClick={() => openEditCompany(c)}>Edit</Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TabPanel>
            <TabPanel>
              <HStack justify="space-between" mb={4}>
                <Heading size="md">References</Heading>
                <Button colorScheme="blue" onClick={() => openAddModal('references')}>Add New Reference</Button>
              </HStack>
              <Heading size="sm" mt={4}>Designers</Heading>
              <Table variant="simple" size="md" mb={6}>
                <Thead>
                  <Tr><Th>Firm</Th><Th>Specialty</Th><Th>Description</Th><Th>Actions</Th></Tr>
                </Thead>
                <Tbody>
                  {references.designers.map(d => (
                    <Tr key={d.firm}>
                      <Td>{d.firm}</Td>
                      <Td>{d.specialty}</Td>
                      <Td>{d.description}</Td>
                      <Td><Button size="sm">Edit</Button></Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
              <Heading size="sm" mt={4}>Law Firms</Heading>
              <Table variant="simple" size="md">
                <Thead>
                  <Tr><Th>Firm</Th><Th>Specialty</Th><Th>Description</Th><Th>Actions</Th></Tr>
                </Thead>
                <Tbody>
                  {references.lawFirms.map(l => (
                    <Tr key={l.firm}>
                      <Td>{l.firm}</Td>
                      <Td>{l.specialty}</Td>
                      <Td>{l.description}</Td>
                      <Td><Button size="sm">Edit</Button></Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TabPanel>
          </TabPanels>
        </Tabs>
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              {modalType === 'insights' && (editInsightSlug ? 'Edit Insight' : 'Add New Insight')}
              {modalType === 'companies' && (editCompanyId ? 'Edit Company' : 'Add New Company')}
              {modalType === 'buildings' && (editBuildingId ? 'Edit Building' : 'Add New Building')}
              {modalType === 'coworking' && (editCoworkingId ? 'Edit Coworking' : 'Add New Coworking')}
            </ModalHeader>
            <ModalBody>
              {modalType === 'insights' && (
                <VStack spacing={4} align="stretch">
                  <Input name="slug" placeholder="Slug (e.g. office-costs-calgary)" value={insightForm.slug} onChange={handleInsightFormChange} />
                  <Input name="title" placeholder="Title" value={insightForm.title} onChange={handleInsightFormChange} />
                  <Input name="date" placeholder="Date (YYYY-MM-DD)" value={insightForm.date} onChange={handleInsightFormChange} />
                  <Input name="excerpt" placeholder="Excerpt" value={insightForm.excerpt} onChange={handleInsightFormChange} />
                  <Text>Content (Markdown):</Text>
                  <Input as="textarea" rows={8} name="content" value={insightForm.content} onChange={handleInsightContentChange} />
                </VStack>
              )}
              {modalType === 'companies' && (
                <VStack spacing={4} align="stretch">
                  <Input name="name" placeholder="Name" value={companyForm.name} onChange={handleCompanyFormChange} />
                  <Input name="address" placeholder="Address" value={companyForm.address} onChange={handleCompanyFormChange} />
                  <Input name="website" placeholder="Website" value={companyForm.website} onChange={handleCompanyFormChange} />
                  <Input name="category" placeholder="Category" value={companyForm.category} onChange={handleCompanyFormChange} />
                  <Input name="description" placeholder="Description" value={companyForm.description} onChange={handleCompanyFormChange} />
                </VStack>
              )}
              {modalType === 'buildings' && (
                <VStack spacing={4} align="stretch">
                  <Input name="name" placeholder="Name" value={buildingForm.name} onChange={handleBuildingFormChange} />
                  <Input name="address" placeholder="Address" value={buildingForm.address} onChange={handleBuildingFormChange} />
                  <Input name="submarket" placeholder="Submarket" value={buildingForm.submarket} onChange={handleBuildingFormChange} />
                  <Input name="description" placeholder="Description" value={buildingForm.description} onChange={handleBuildingFormChange} />
                </VStack>
              )}
              {modalType === 'coworking' && (
                <VStack spacing={4} align="stretch">
                  <Input name="name" placeholder="Name" value={coworkingForm.name} onChange={handleCoworkingFormChange} />
                  <Input name="location" placeholder="Location" value={coworkingForm.location} onChange={handleCoworkingFormChange} />
                  <Input name="submarket" placeholder="Submarket" value={coworkingForm.submarket} onChange={handleCoworkingFormChange} />
                  <Input name="description" placeholder="Description" value={coworkingForm.description} onChange={handleCoworkingFormChange} />
                </VStack>
              )}
            </ModalBody>
            <ModalFooter>
              {modalType === 'insights' && (
                <Button colorScheme="blue" mr={3} onClick={handleInsightSubmit}>
                  {editInsightSlug ? 'Save Changes' : 'Add Insight'}
                </Button>
              )}
              {modalType === 'companies' && (
                <Button colorScheme="blue" mr={3} onClick={handleCompanySubmit}>
                  {editCompanyId ? 'Save Changes' : 'Add Company'}
                </Button>
              )}
              {modalType === 'buildings' && (
                <Button colorScheme="blue" mr={3} onClick={handleBuildingSubmit}>
                  {editBuildingId ? 'Save Changes' : 'Add Building'}
                </Button>
              )}
              {modalType === 'coworking' && (
                <Button colorScheme="blue" mr={3} onClick={handleCoworkingSubmit}>
                  {editCoworkingId ? 'Save Changes' : 'Add Coworking'}
                </Button>
              )}
              <Button onClick={onClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Layout>
  );
}
