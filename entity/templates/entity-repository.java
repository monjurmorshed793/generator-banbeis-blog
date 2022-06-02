package <%= package %>

import <%= modelPackage %>
import org.springframework.data.mongodb.repository.MongoRepository;

public interface <%= modelName%>Repository extends MongoRepository<<%= modelName %>, <%= id %>>{

}
