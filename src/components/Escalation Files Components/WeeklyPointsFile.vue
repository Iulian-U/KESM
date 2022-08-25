<template>
  <a-config-provider :locale="enUS">
    <!-- header with inputs -->
    <div class="sticky top-0 z-40 shadow">
      <!-- Title container -->
      <div class="bg-white flex justify-center">
        <h2 class="text-2xl font-semibold py-1 mt-2">Weekly Points File - Week</h2>
        <WeekDisplay class="text-2xl font-semibold py-1 ml-1 mt-2 text-indigo-600" />
      </div>

      <!-- Inputs Container -->
      <div class="inputs-container bg-white py-3 flex justify-around">
        <!-- Country Input -->

        <a-select
          placeholder="Country Select"
          allow-clear
          allow-search
          v-model="pointsStore.newRow.country"
          :style="{ width: '160px' }"
        >
          <a-option>Argentina</a-option>
          <a-option>Australia</a-option>
          <a-option>Austria</a-option>
          <a-option>Belgium</a-option>
          <a-option>Brazil</a-option>
          <a-option>Canada</a-option>
          <a-option>Chile</a-option>
          <a-option>China</a-option>
          <a-option>Colombia</a-option>
          <a-option>Czech</a-option>
          <a-option>Denmark</a-option>
          <a-option>Finland</a-option>
          <a-option>France</a-option>
          <a-option>Germany</a-option>
          <a-option>Greece</a-option>
          <a-option>Hong Kong</a-option>
          <a-option>Hungary</a-option>
          <a-option>India</a-option>
          <a-option>Indonesia</a-option>
          <a-option>Ireland</a-option>
          <a-option>Italy</a-option>
          <a-option>Japan</a-option>
          <a-option>Malaysia</a-option>
          <a-option>Mexico</a-option>
          <a-option>Netherlands</a-option>
          <a-option>New Zealand</a-option>
          <a-option>Norway</a-option>
          <a-option>Peru</a-option>
          <a-option>Philippines</a-option>
          <a-option>Poland</a-option>
          <a-option>Portugal</a-option>
          <a-option>Romania</a-option>
          <a-option>Russia</a-option>
          <a-option>Singapore</a-option>
          <a-option>South Africa</a-option>
          <a-option>South Korea</a-option>
          <a-option>Spain</a-option>
          <a-option>Sweden</a-option>
          <a-option>Switzerland</a-option>
          <a-option>Taiwan</a-option>
          <a-option>Thailand</a-option>
          <a-option>Turkey</a-option>
          <a-option>UK</a-option>
          <a-option>US</a-option>
          <a-option>Vietnam</a-option>
        </a-select>

        <!-- CINT ID Input -->

        <a-input
          v-model="pointsStore.newRow.cintID"
          placeholder="CINT ID"
          allow-clear
          :max-length="10"
          :style="{ width: '150px' }"
        />

        <!-- Project ID Input -->

        <a-input
          v-model="pointsStore.newRow.projectID"
          placeholder="Project ID"
          allow-clear
          :max-length="7"
          :style="{ width: '150px' }"
        />

        <!-- LOI Input -->

        <a-input
          placeholder="LOI"
          v-model="pointsStore.newRow.loi"
          allow-clear
          :style="{ width: '150px' }"
        />

        <!-- Lifepoints Input -->

        <a-input
          placeholder="Lifepoints"
          v-model="pointsStore.newRow.lifepoints"
          allow-clear
          :style="{ width: '150px' }"
        />

        <!-- Ticket Input -->

        <a-input
          placeholder="Ticket"
          :max="7"
          v-model="pointsStore.newRow.ticket"
          allow-clear
          :max-length="7"
          :style="{ width: '150px' }"
        />

        <!-- Date Input -->

        <a-date-picker
          format="MM-DD-YYYY"
          placeholder="Date"
          v-model="pointsStore.newRow.date"
          :style="{ width: '150px' }"
        />

        <!-- Description Input -->

        <a-input
          placeholder="Description"
          v-model="pointsStore.newRow.description"
          allow-clear
          :style="{ width: '150px' }"
        />

        <!-- Alphanumeric ID Input -->

        <a-input
          placeholder="Alphanumeric ID"
          v-model="pointsStore.newRow.alphanumericID"
          allow-clear
          :style="{ width: '150px' }"
        />

        <!-- Add row button -->

        <a-button type="primary" @click="addNewRow()" :style="{ width: '100px' }">
          <template #icon>
            <icon-plus />
          </template>
          <template #default>Add</template>
        </a-button>
      </div>
    </div>

    <!-- Table with data -->
    <div>
      <table
        class="mx-auto mt-4 h-auto bg-white rounded-t-lg shadow"
        ref="pointsTable"
        data-cols-width="12,15,15,12,12,12,15,15,20,15"
      >
        <thead>
          <tr>
            <th data-f-bold="true">Country</th>
            <th data-f-bold="true">CINT Panelist ID</th>
            <th data-f-bold="true">CINT Project ID</th>
            <th data-f-bold="true">Est. LOI</th>
            <th data-f-bold="true">Lifepoints</th>
            <th data-f-bold="true">ZD Ticket</th>
            <th data-f-bold="true">Agent Name</th>
            <th data-f-bold="true">Request Date</th>
            <th data-f-bold="true">Description</th>
            <th data-f-bold="true">Alphanumeric ID</th>
            <th data-exclude="true">
              <div class="flex justify-center">
                <p>Edit</p>
                <a-tooltip
                  content="You can edit any value by clicking on it. Then to update it, simply click on the 'Update' button."
                >
                  <vue-feather type="info" size="13" class="ml-1"></vue-feather>
                </a-tooltip>
              </div>
            </th>
            <th data-exclude="true">Delete</th>
          </tr>
        </thead>

        <tbody v-for="row in pointsStore.rows" :key="row.id">
          <tr class="border">
            <td data-label="COUNTRY">
              <a-input v-model="row.country" />
              <p class="hidden">{{ row.country }}</p>
            </td>

            <td data-label="CINT ID">
              <a-input v-model="row.cintID" :max-length="10" />
              <p class="hidden">{{ row.cintID }}</p>
            </td>

            <td data-label="PROJECT ID">
              <a-input v-model="row.projectID" :max-length="7" />
              <p class="hidden">{{ row.projectID }}</p>
            </td>

            <td data-label="LOI">
              <a-input v-model="row.loi" />
              <p class="hidden">{{ row.loi }}</p>
            </td>

            <td data-label="LIFEPOINTS">
              <a-input v-model="row.lifepoints" />
              <p class="hidden">{{ row.lifepoints }}</p>
            </td>

            <td data-label="TICKET">
              <a-input v-model="row.ticket" :max-length="7" />
              <p class="hidden">{{ row.ticket }}</p>
            </td>

            <td data-label="AGENT">
              <a-input v-model="storeUser.fullName" />
              <p class="hidden">{{ storeUser.fullName }}</p>
            </td>

            <td data-label="DATE">
              <a-input v-model="row.date" />
              <p class="hidden">{{ row.date }}</p>
            </td>

            <td data-label="DESCRIPTION">
              <a-textarea v-model="row.description" />
              <p class="hidden">{{ row.description }}</p>
            </td>

            <td data-label="ALPHANUMERIC ID">
              <a-input v-model="row.alphanumericID" />
              <p class="hidden">{{ row.alphanumericID }}</p>
            </td>

            <td data-label="EDIT" data-exclude="true">
              <a-button
                type="primary"
                @click="
                  editRow();
                  $notification.success('Value updated successfully!');
                "
              >
                <template #icon>
                  <icon-edit />
                </template>

                <template #default>Update</template>
              </a-button>
            </td>

            <td data-label="DELETE" data-exclude="true">
              <a-popconfirm
                content="Are you sure ?"
                oktext="Yes"
                @ok="
                  $notification.success('Row deleted successfully!');
                  deleteRow(row.id);
                "
              >
                <a-button type="primary">
                  <template #icon>
                    <icon-delete />
                  </template>
                  <template #default>Delete</template>
                </a-button>
              </a-popconfirm>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Empty data display -->
      <div class="bg-white mx-auto mt-1 empty_data" v-show="pointsStore.rows.length === 0">
        <a-empty />
      </div>

      <!-- Floating button -->
      <div class="absolute bottom-10 z-50 mb-10 ml-10">
        <FloatingMenu
          @clear-data="openModal()"
          @download-data="
            convertTable(
              pointsTable,
              `Weekly Points file Week ${storeWeek.week} - ${storeUser.fullName}`
            )
          "
        />
      </div>

      <!-- Delete confirmation Modal -->
      <a-modal
        v-model:visible="visible"
        @ok="
          clearAllRows();
          $notification.success('All data has been deleted!');
        "
      >
        <template #title> Warning! </template>
        <div>All data will be permanently deleted, are you sure you want to proceed?</div>
      </a-modal>
    </div>
  </a-config-provider>
</template>

<script setup>
// Import EN language for Arco Library
import enUS from "@arco-design/web-vue/es/locale/lang/en-us";

// Import Arco Library Icons
import {
  IconPlus,
  IconDelete,
  IconDownload,
  IconBug,
  IconBulb,
  IconClose,
  IconMessage,
  IconEdit,
  IconSettings,
  IconRefresh,
} from "@arco-design/web-vue/es/icon";

// Vue imports
import { onMounted, ref } from "@vue/runtime-core";

// Components import
import FloatingMenu from "../../components/FloatingMenu.vue";
import WeekDisplay from "../../components/WeekDisplay.vue";

// Stores import
import { useUserStore } from "../../stores/userInfo";
import { weekStore } from "../../stores/weekStore";
import { useWeeklyPointsStore } from "../../stores/Escalation_Files_Stores/pointsStore";

//Composables import
import getUser from "../../composables/getUser";
import convertTableToExcel from "../../composables/convertTableToExcel";

// Stores variables
const storeWeek = weekStore();
const storeUser = useUserStore();
const pointsStore = useWeeklyPointsStore();

// Destructuring userInfo composable
const { userInfo } = getUser();

// Table to excel destructuring
const { convertTable } = convertTableToExcel();

// Target the table
const pointsTable = ref(null);

// Modal display status
const visible = ref(false);

const openModal = () => {
  visible.value = true;
};

// Clear input fields on component mount
onMounted(async () => {
  clearInputFields();
});

// Function to clear the input fields
function clearInputFields() {
  pointsStore.newRow.country = "";
  pointsStore.newRow.cintID = "";
  pointsStore.newRow.projectID = "";
  pointsStore.newRow.loi = "";
  pointsStore.newRow.lifepoints = "";
  pointsStore.newRow.ticket = "";
  pointsStore.newRow.date = "";
  pointsStore.newRow.description = "";
  pointsStore.newRow.alphanumericID = "";
}

// Function to add new row to the table
function addNewRow() {
  pointsStore.$patch((state) => {
    state.newRow.id = Math.floor(Math.random() * 10000);
    state.rows.push(state.newRow);
    state.newRow = {
      country: "",
      cintID: "",
      projectID: "",
      loi: "",
      lifepoints: "",
      ticket: "",
      date: "",
      description: "",
      alphanumericID: "",
    };
    state.hasChanged = true;
  });
}

// Function to edit a row
function editRow() {
  pointsStore.$patch((state) => {
    state.selectedRow = state.rows.indexOf(state.newRow);
    state.newRow = {};
    state.hasChanged = true;
  });
}

// Function to delete a row
function deleteRow(id) {
  pointsStore.$patch((state) => {
    state.rows = state.rows.filter((row) => row.id !== id);
    state.hasChanged = true;
  });
}

// Function to clear all rows
function clearAllRows() {
  pointsStore.$patch((state) => {
    state.rows = [];
    state.hasChanged = true;
  });
}
</script>

<style scoped>
/* Table styles */
table,
.empty_data {
  width: 97%;
}
th,
td {
  margin: 1rem;
  padding: 1rem;
}
.footer {
  width: 20%;
}

.button-trigger {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 55px;
  height: 55px;
  color: var(--color-white);
  font-size: 14px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.1s;
}

table caption {
  font-size: 1.5em;
  margin: 0.5em 0 0.75em;
}

table tr {
  background-color: #f8f8f8;
  border: 1px solid #ddd;
  padding: 0.35em;
}

table th,
table td {
  padding: 0.625em;
  text-align: center;
}

table th {
  font-size: 0.95em;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

@media screen and (max-width: 600px) {
  .inputs-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

  table {
    border: 0;
  }

  table caption {
    font-size: 1.3em;
  }

  table thead {
    border: none;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }

  table tr {
    border-bottom: 3px solid #ddd;
    display: block;
    margin-bottom: 0.625em;
  }

  table td {
    border-bottom: 1px solid #ddd;
    display: block;
    font-size: 0.8em;
    text-align: right;
  }

  table td::before {
    /*
    * aria-label has no advantage, it won't be read inside a table
    content: attr(aria-label);
    */
    content: attr(data-label);
    float: left;
    font-weight: bold;
    text-transform: uppercase;
  }

  table td:last-child {
    border-bottom: 0;
  }
}
</style>
