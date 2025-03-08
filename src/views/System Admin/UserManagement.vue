
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
                      <button class="action-button" @click="toggleActionMenu(user)">
                        <i class="fas fa-ellipsis-h"></i>
                      </button>
                      <div v-if="selectedUser === user" class="action-menu">
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
      toggleActionMenu(user) {
        this.selectedUser = this.selectedUser === user ? null : user
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
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 14px;
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
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 14px;
    min-width: 150px;
    background-color: white;
  }
  
  .users-table {
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    overflow: hidden;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th, td {
    padding: 16px;
    text-align: left;
    border-bottom: 1px solid #eee;
  }
  
  th {
    font-weight: 600;
    color: #666;
    background-color: #f9f9f9;
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
  }
  
  .action-menu {
    position: absolute;
    right: 0;
    top: 100%;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    z-index: 10;
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
    color: #333;
  }
  
  .action-menu button:hover {
    background-color: #f5f5f5;
  }
  
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }
  
  .modal-content {
    background: white;
    border-radius: 12px;
    width: 100%;
    max-width: 500px;
    padding: 24px;
  }
  
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
  }
  
  .modal-header h2 {
    font-size: 20px;
    font-weight: 600;
    color: #333;
  }
  
  .close-button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 20px;
    color: #666;
  }
  
  .form-group {
    margin-bottom: 16px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    color: #333;
  }
  
  .form-group select {
    width: 100%;
    padding: 8px 16px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 14px;
  }
  
  .confirm-button {
    width: 100%;
    padding: 12px;
    background-color: #DD385A;
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: 500;
    cursor: pointer;
    margin-top: 16px;
  }
  
  .warning-box {
    background-color: #FFF3F3;
    border: 1px solid #FFCDD2;
    border-radius: 8px;
    padding: 16px;
    margin: 16px 0;
    color: #D32F2F;
  }
  
  .warning-box i {
    font-size: 24px;
    margin-bottom: 8px;
  }
  
  .modal-actions {
    display: flex;
    gap: 16px;
    margin-top: 24px;
  }
  
  .delete-button {
    flex: 1;
    padding: 12px;
    background-color: #DD385A;
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: 500;
    cursor: pointer;
  }
  
  .cancel-button {
    flex: 1;
    padding: 12px;
    background-color: #f5f5f5;
    color: #666;
    border: none;
    border-radius: 8px;
    font-weight: 500;
    cursor: pointer;
  }
  
  .delete-message {
    font-size: 16px;
    color: #333;
    margin-bottom: 16px;
  }
  </style>