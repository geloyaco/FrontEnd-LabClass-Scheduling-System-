
<template>
    <div class="dashboard-layout">
      <DashBoardSidebarSysAd />
      <div class="main-content">
        <DashBoardTopbar />
        <div class="dashboard-content">
          <div class="header">
            <h1>User Management</h1>
          </div>
  
          <div class="filters-section">
            <div class="search-box">
              <input type="text" placeholder="Search..." v-model="searchQuery">
              <i class="fas fa-search"></i>
            </div>
            
            <div class="filter-group">
              <div class="filter-dropdown">
                <select v-model="selectedRole">
                  <option value="">Roles</option>
                  <option value="System Administrator">System Administrator</option>
                  <option value="Academic Coordinator">Academic Coordinator</option>
                  <option value="Dean">Dean</option>
                  <option value="Faculty/Staff">Faculty/Staff</option>
                  <option value="Student">Student</option>
                </select>
              </div>
  
              <div class="filter-dropdown">
                <select v-model="selectedPermission">
                  <option value="">Permissions</option>
                  <option value="Full Scheduling Control">Full Scheduling Control</option>
                  <option value="Approval & Oversight">Approval & Oversight</option>
                  <option value="Viewer">Viewer</option>
                  <option value="System Management">System Management</option>
                </select>
              </div>
            </div>
          </div>
  
          <div class="users-table">
            <div class="table-container">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Permissions</th>
                    <th>Roles</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="user in filteredUsers" :key="user.id">
                    <td>{{ user.id }}</td>
                    <td>{{ user.fullName }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.permissions }}</td>
                    <td>
                      <span class="role-badge" :class="getRoleBadgeClass(user.role)">
                        {{ user.role }}
                      </span>
                    </td>
                    <td>
                      <div class="actions">
                        <button class="action-button" @click="toggleActionMenu(user, $event)">
                          <i class="fas fa-ellipsis-h"></i>
                        </button>
                        <div v-if="selectedUser === user" class="action-menu" :style="{ top: menuPosition.top, left: menuPosition.left }">
                          <button @click="showModifyModal(user)">
                            <i class="fas fa-edit"></i> Modify
                          </button>
                          <button @click="showDeleteModal(user)">
                            <i class="fas fa-trash"></i> Delete
                          </button>
                          <button @click="deactivateUser(user)">
                            <i class="fas fa-ban"></i> Deactivate
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Modify User Modal -->
      <div v-if="showingModifyModal" class="modal">
        <div class="modal-content">
          <div class="modal-header">
            <h2>Please Select</h2>
            <button class="close-button" @click="closeModals">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label>Roles</label>
              <select v-model="modifyForm.role">
                <option value="System Administrator">System Administrator</option>
                <option value="Academic Coordinator">Academic Coordinator</option>
                <option value="Dean">Dean</option>
                <option value="Faculty/Staff">Faculty/Staff</option>
                <option value="Student">Student</option>
              </select>
            </div>
            <div class="form-group">
              <label>Permissions</label>
              <select v-model="modifyForm.permissions">
                <option value="Full Scheduling Control">Full Scheduling Control</option>
                <option value="Approval & Oversight">Approval & Oversight</option>
                <option value="Viewer">Viewer</option>
                <option value="System Management">System Management</option>
              </select>
            </div>
            <button class="confirm-button" @click="confirmModify">Confirm</button>
          </div>
        </div>
      </div>
  
      <!-- Delete User Modal -->
      <div v-if="showingDeleteModal" class="modal">
        <div class="modal-content">
          <div class="modal-header">
            <h2>Delete User</h2>
            <button class="close-button" @click="closeModals">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div class="modal-body">
            <p class="delete-message">Are you sure you want to delete {{ selectedUser?.fullName }}?</p>
            <div class="warning-box">
              <i class="fas fa-exclamation-triangle"></i>
              <p>Warning!</p>
              <p>By deleting this user, their access to the system will be revoked, and their data may be lost. This action cannot be undone. Are you sure you want to continue?</p>
            </div>
            <div class="modal-actions">
              <button class="delete-button" @click="confirmDelete">Yes, Delete</button>
              <button class="cancel-button" @click="closeModals">No, Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import DashBoardSidebarSysAd from '../../components/DashBoardSidebarSysAd.vue'
  import DashBoardTopbar from '../../components/DashBoardTopbar.vue'
  
  export default {
    name: 'UserManagement',
    components: {
      DashBoardSidebarSysAd,
      DashBoardTopbar
    },
    data() {
      return {
        searchQuery: '',
        selectedRole: '',
        selectedPermission: '',
        selectedUser: null,
        menuPosition: { top: 0, left: 0 },
        showingModifyModal: false,
        showingDeleteModal: false,
        modifyForm: {
          role: '',
          permissions: ''
        },
        users: [
          {
            id: '2200001843',
            fullName: 'John Doe',
            email: 'jdoe@uic.edu.ph',
            permissions: 'System Management',
            role: 'System Administrator'
          },
          {
            id: '2200012453',
            fullName: 'Charlie Brown',
            email: 'cbrown@uic.edu.ph',
            permissions: 'Full Scheduling Control',
            role: 'Academic Coordinator'
          },
          {
            id: '2200453671',
            fullName: 'Sarah Jane',
            email: 'sjane@uic.edu.ph',
            permissions: 'Approval & Oversight',
            role: 'Dean'
          },
          {
            id: '2209869313',
            fullName: 'Prince John',
            email: 'pjohn@uic.edu.ph',
            permissions: 'Viewer',
            role: 'Faculty/Staff'
          },
          {
            id: '2209869313',
            fullName: 'Raphael Smith',
            email: 'rsmith@uic.edu.ph',
            permissions: 'Viewer',
            role: 'Faculty/Staff'
          }
        ]
      }
    },
    computed: {
      filteredUsers() {
        return this.users.filter(user => {
          const matchesSearch = !this.searchQuery || 
            user.fullName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            user.id.includes(this.searchQuery)
          
          const matchesRole = !this.selectedRole || user.role === this.selectedRole
          const matchesPermission = !this.selectedPermission || user.permissions === this.selectedPermission
  
          return matchesSearch && matchesRole && matchesPermission
        })
      }
    },
    methods: {
      getRoleBadgeClass(role) {
        const classes = {
          'System Administrator': 'admin',
          'Academic Coordinator': 'coordinator',
          'Dean': 'dean',
          'Faculty/Staff': 'staff',
          'Student': 'student'
        }
        return classes[role] || ''
      },
      toggleActionMenu(user, event) {
        if (this.selectedUser === user) {
          this.selectedUser = null;
          return;
        }
        
        this.selectedUser = user;
        
        // Get button position
        const button = event.target.closest('.action-button');
        const rect = button.getBoundingClientRect();
        
        // Calculate menu position
        this.menuPosition = {
          top: rect.bottom + window.scrollY + 'px',
          left: rect.left + window.scrollX - 110 + 'px' // Adjust 110px to align menu properly
        };
      },
      showModifyModal(user) {
        this.selectedUser = user
        this.modifyForm.role = user.role
        this.modifyForm.permissions = user.permissions
        this.showingModifyModal = true
      },
      showDeleteModal(user) {
        this.selectedUser = user
        this.showingDeleteModal = true
      },
      closeModals() {
        this.showingModifyModal = false
        this.showingDeleteModal = false
        this.selectedUser = null
      },
      confirmModify() {
        if (this.selectedUser) {
          this.selectedUser.role = this.modifyForm.role
          this.selectedUser.permissions = this.modifyForm.permissions
        }
        this.closeModals()
      },
      confirmDelete() {
        if (this.selectedUser) {
          this.users = this.users.filter(user => user !== this.selectedUser)
        }
        this.closeModals()
      },
      deactivateUser(user) {
        // Implement deactivation logic here
        this.selectedUser = null
      }
    }
  }
  </script>
  
  <style scoped>
  .dashboard-layout {
    display: flex;
    min-height: 100vh;
    background-color: #f5f5f5;
    width: 100vw;
  }
  
  .main-content {
    flex: 1;
    margin-left: 70px;
    width: calc(100vw - 70px);
    min-width: 0;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
  }

  .dashboard-content {
    padding: 24px;
    min-height: calc(100vh - 60px);
    background-color: #f5f5f5;
    width: 100%;
  }
  
  .header {
    margin-bottom: 24px;
  }
  
  .header h1 {
    font-size: 20px;
    font-weight: 500;
    color: #DD385A;
  }
  
  .filters-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    gap: 16px;
  }
  
  .search-box {
    position: relative;
    width: 220px;
  }
  
  .search-box input {
    width: 100%;
    padding: 8px 16px;
    padding-left: 40px;
    border: 1px solid #DD385A;
    border-radius: 8px;
    font-size: 14px;
  }

  .search-box input:focus {
    border-color: #DD385A;
    outline: none;
  }

  .search-box i {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #666;
  }
  
  .filter-group {
    display: flex;
    gap: 16px;
  }
  
  .filter-dropdown select {
    padding: 8px 16px;
    border: 1px solid #DD385A;
    border-radius: 8px;
    font-size: 14px;
    min-width: 150px;
    cursor: pointer;
    color: #666;
    font-weight: normal;
    background-color: white;
  }

  .filter-dropdown select:focus {
    border-color: #DD385A;
    outline: none;
  }

  .filter-dropdown select option[value=""] {
    color: rgba(102, 102, 102, 0.6);
  }

  .filter-dropdown select option:not([value=""]) {
    color: #DD385A;
    font-weight: 500;
    background-color: white;
  }

  .filter-dropdown select option:checked {
    background-color: #DD385A;
    color: white;
  }

  .filter-dropdown select option:hover {
    background-color: rgba(221, 56, 90, 0.1);
  }
  
  .users-table {
    background: white;
    border-radius: 8px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    position: relative;
    max-height: calc(100vh - 250px); /* Adjust based on your header and filters height */
    overflow: hidden;
  }
  
  .table-container {
    overflow-y: auto;
    max-height: 100%;
    position: relative;
  }

  /* Custom scrollbar styling */
  .table-container::-webkit-scrollbar {
    width: 8px;
  }

  .table-container::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }

  .table-container::-webkit-scrollbar-thumb {
    background: #DD385A;
    border-radius: 4px;
  }

  .table-container::-webkit-scrollbar-thumb:hover {
    background: #c62f4d;
  }

  .users-table table {
    width: 100%;
    border-collapse: collapse;
  }

  .users-table thead {
    position: sticky;
    top: 0;
    background-color: #f9f9f9;
    z-index: 1;
  }

  .users-table th, .users-table td {
    padding: 16px;
    text-align: left;
    border-bottom: 1px solid #eee;
  }
  
  .users-table th {
    font-weight: 600;
    color: #DD385A;
    background-color: #f9f9f9;
  }
  
  .users-table td {
    padding: 12px 16px;
    color: #666; /* Default color for all cells */
  }

  .users-table td:nth-child(1) { /* ID */
    font-family: 'Inter', sans-serif;
    color: #666;
  }

  .users-table td:nth-child(2) { /* Full Name */
    color: #DD385A;
    font-weight: 500;
  }

  .users-table td:nth-child(3) { /* Email */
    font-family: 'Inter', sans-serif;
    color: #666;
  }

  .users-table td:nth-child(4) { /* Permissions */
    color: #DD385A;
    font-weight: 500;
  }
  
  .users-table td:nth-child(5) { /* Roles */
    color: #666;
  }
  
  .role-badge {
    padding: 4px 12px;
    border-radius: 16px;
    font-size: 12px;
    font-weight: 500;
  }
  
  .role-badge.admin {
    background-color: #DD385A;
    color: white;
  }
  
  .role-badge.coordinator {
    background-color: #E57373;
    color: white;
  }
  
  .role-badge.dean {
    background-color: #F06292;
    color: white;
  }
  
  .role-badge.staff {
    background-color: #FFB74D;
    color: white;
  }
  
  .role-badge.student {
    background-color: #81C784;
    color: white;
  }
  
  .actions {
    position: relative;
  }
  
  .action-button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px 8px;
    color: #DD385A;
  }
  
  .action-button i {
    color: #DD385A;
  }
  
  .action-menu {
    position: fixed;
    background: white;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    z-index: 1000;
    min-width: 150px;
  }
  
  .action-menu button {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    padding: 8px 16px;
    border: none;
    background: none;
    cursor: pointer;
    text-align: left;
    color: #DD385A;
  }
  
  .action-menu button i {
    margin-right: 8px;
    color: #DD385A;
  }
  
  .action-menu button:hover {
    color: #DD385A;
    background-color: rgba(221, 56, 90, 0.1);
  }
  
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }
  
  .modal-content {
    background: white;
    border-radius: 8px;
    width: 100%;
    max-width: 400px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }
  
  .modal-header {
    padding: 16px 24px;
    border-bottom: 1px solid rgba(221, 56, 90, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .modal-header h2 {
    color: #DD385A;
    font-size: 20px;
    font-weight: 500;
    margin: 0;
  }
  
  .close-button {
    background: none;
    border: none;
    color: #DD385A;
    cursor: pointer;
    font-size: 18px;
    padding: 4px;
  }
  
  .modal-body {
    padding: 24px;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 8px;
    color: #DD385A;
    font-weight: 500;
  }
  
  .form-group select {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid rgba(221, 56, 90, 0.2);
    border-radius: 6px;
    font-size: 14px;
    color: #666;
    background-color: white;
  }
  
  .form-group select:focus {
    outline: none;
    border-color: #DD385A;
  }
  
  .form-group select option {
    color: #DD385A;
    font-weight: 500;
  }
  
  .form-group select option[value=""] {
    color: rgba(102, 102, 102, 0.6);
  }
  
  .confirm-button {
    width: 100%;
    padding: 12px;
    background-color: #DD385A;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .confirm-button:hover {
    background-color: #c62f4d;
  }
  
  .warning-box {
    background-color: rgba(221, 56, 90, 0.05);
    border: 1px solid rgba(221, 56, 90, 0.2);
    border-radius: 6px;
    padding: 16px;
    margin: 16px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .warning-box i {
    color: #DD385A;
    font-size: 24px;
    margin-bottom: 8px;
  }
  
  .warning-box p {
    margin: 4px 0;
    color: #666;
  }
  
  .warning-box p:first-of-type {
    color: #DD385A;
    font-weight: 500;
    font-size: 16px;
  }
  
  .delete-message {
    font-size: 16px;
    color: #DD385A;
    margin-bottom: 16px;
    text-align: center;
    font-weight: 500;
  }
  
  .modal-actions {
    display: flex;
    gap: 12px;
    margin-top: 24px;
  }
  
  .delete-button {
    flex: 1;
    padding: 12px;
    background-color: #DD385A;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .delete-button:hover {
    background-color: #c62f4d;
  }
  
  .cancel-button {
    flex: 1;
    padding: 12px;
    background-color: #f5f5f5;
    color: #666;
    border: none;
    border-radius: 6px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .cancel-button:hover {
    background-color: #ebebeb;
  }
  </style>