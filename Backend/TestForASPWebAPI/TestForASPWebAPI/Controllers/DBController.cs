using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;

namespace TestForASPWebAPI.Controllers
{
    public class DBController : ControllerBase
    {
        public DBController()
        {
            sqlConnection = new SqlConnection(_dbConnectionString);
        }
        private readonly string _dbConnectionString = @"Data Source=.\SQLEXPRESS;Initial Catalog=CompuWeb;Integrated Security=True";
        private SqlConnection sqlConnection;

        private static DBController instance;

        // Private constructor to prevent external instantiation

        public static DBController GetInstance()
        {
            if (instance == null)
            {
                instance = new DBController();
            }
            return instance;
        }

        public async Task<int> GetCount(string command)
        {
            var dataTable = new DataTable();
            int count = 0;
            using (sqlConnection = new SqlConnection(_dbConnectionString))
            {
                try
                {
                    sqlConnection.Open();

                    using (var sqlCommand = new SqlCommand(command, sqlConnection))
                    {
                        count = (int)sqlCommand.ExecuteScalar();
                    }
                }
                catch (Exception ex)
                {
                    return -1;
                }
                finally { }
            }
            return count;
        }

        public async Task<DataTable> GetData(string command)
        {
            var dataTable = new DataTable();
            using (sqlConnection = new SqlConnection(_dbConnectionString))
            {
                try
                {
                    sqlConnection.Open();

                    using (var sqlCommand = new SqlCommand(command, sqlConnection))
                    {
                        using (var sqlReader = sqlCommand.ExecuteReader())
                        {
                            dataTable.Load(sqlReader);
                        }
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.ToString());
                }
                finally {}
            }
            return dataTable;
        }
        public void UpdateData(string command)
        {
            using (sqlConnection = new SqlConnection(_dbConnectionString))
            {
                try
                {
                    sqlConnection.Open();

                    using (SqlCommand cmd = new SqlCommand(command, sqlConnection))
                    {
                        cmd.ExecuteNonQuery();
                    }
                }
                catch (Exception ex)
                {
                }
                finally {}
            }
            return;
        }
        public void InsertData(string command)
        {
            using (sqlConnection = new SqlConnection(_dbConnectionString))
            {
                try
                {
                    sqlConnection.Open();

                    using (SqlCommand cmd = new SqlCommand(command, sqlConnection))
                    {
                        cmd.ExecuteNonQuery();
                    }
                }
                catch (Exception ex)
                {
                }
                finally {}
            }
            return;
        }
        public void DeleteData(string command)
        {
            using (sqlConnection = new SqlConnection(_dbConnectionString))
            {
                try
                {
                    sqlConnection.Open();

                    using (SqlCommand cmd = new SqlCommand(command, sqlConnection))
                    {
                        cmd.ExecuteNonQuery();
                    }
                }
                catch (Exception ex)
                {
                }
                finally {}
            }
            return;
        }
    }
}
